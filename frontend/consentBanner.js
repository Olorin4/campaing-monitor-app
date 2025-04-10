// frontend.consentBanner.js

export default function loadGA() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX", { debug_mode: true });

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    document.head.appendChild(script);
}
