import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  isBotSubmission,
  type ContactPayload,
  validateContactPayload,
} from "@/lib/contact-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function silentOk() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const validated = validateContactPayload(body);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { name, email, subject, message, startedAt, website } =
      validated.data;

    if (isBotSubmission(website, startedAt)) {
      return silentOk();
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfter ?? 60),
          },
        }
      );
    }

    if (!resend) {
      return NextResponse.json(
        {
          error:
            "Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL in Vercel.",
        },
        { status: 503 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL ?? "Dan.Ogrodnik@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL ??
      "Dan Ogrodnik <contact@mail.danogrodnik.com>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
