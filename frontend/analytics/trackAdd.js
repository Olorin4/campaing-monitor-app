// frontend/analytics/trackAdd.js

let typingStartTime = null;

export function trackTypingStart() {
    if (!typingStartTime) typingStartTime = Date.now();
}

function isGenericEmail(email) {
    const genericDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "aol.com",
        "icloud.com",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return genericDomains.includes(domain) ? "generic" : "personal";
}

export function trackAddSubscriber(email, error = false) {
    const timeToSubmit = typingStartTime ? Date.now() - typingStartTime : null;
    typingStartTime = null; // reset

    const emailType = isGenericEmail(email);

    if (typeof window.gtag === "function") {
        window.gtag("event", "add_subscriber", {
            event_category: "form",
            time_to_submit: timeToSubmit,
            email_type: isGenericEmail(email),
            error: error,
        });
    }
}
