import Script from "next/script";

/** Same container + custom dataLayer name as the legacy danogrodnik site. */
export const GTM_ID = "GTM-PWX68TK";
export const GTM_DATA_LAYER = "GTMdataLayer1";

const gtmBootstrap = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','${GTM_DATA_LAYER}','${GTM_ID}');`;

/**
 * beforeInteractive injects into <head> early (ahead of page JS).
 * Keep this in the root layout so Tag Assistant sees the snippet in head.
 */
export function GoogleTagManagerScript() {
  return (
    <Script id="gtm-base" strategy="beforeInteractive">
      {gtmBootstrap}
    </Script>
  );
}

/** Place immediately after the opening <body> tag. */
export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
