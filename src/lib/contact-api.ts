export const LIMITS = {
  name: 120,
  email: 200,
  subject: 200,
  message: 5000,
} as const;

export const MIN_FORM_TIME_MS = 2000;
export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
  startedAt?: number;
};

export function stripCrLf(value: string): string {
  return value.replace(/[\r\n]/g, "");
}

export function validateContactPayload(body: ContactPayload): {
  ok: true;
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    startedAt: number;
    website: string;
  };
} | { ok: false; error: string } {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject =
    stripCrLf(body.subject?.trim() ?? "") || "Portfolio contact";
  const message = body.message?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const startedAt =
    typeof body.startedAt === "number" && Number.isFinite(body.startedAt)
      ? body.startedAt
      : 0;

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }

  if (name.length > LIMITS.name) {
    return { ok: false, error: `Name must be ${LIMITS.name} characters or fewer.` };
  }

  if (email.length > LIMITS.email) {
    return { ok: false, error: `Email must be ${LIMITS.email} characters or fewer.` };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (subject.length > LIMITS.subject) {
    return {
      ok: false,
      error: `Subject must be ${LIMITS.subject} characters or fewer.`,
    };
  }

  if (message.length > LIMITS.message) {
    return {
      ok: false,
      error: `Message must be ${LIMITS.message} characters or fewer.`,
    };
  }

  return {
    ok: true,
    data: { name, email, subject, message, startedAt, website },
  };
}

export function isBotSubmission(website: string, startedAt: number): boolean {
  if (website.length > 0) return true;
  if (startedAt <= 0) return true;
  if (Date.now() - startedAt < MIN_FORM_TIME_MS) return true;
  return false;
}

const rateLimitMap = new Map<string, number[]>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    const oldest = recent[0] ?? now;
    const retryAfter = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000
    );
    return { allowed: false, retryAfter: Math.max(1, retryAfter) };
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return { allowed: true };
}
