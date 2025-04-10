// frontent/analytics/trackRemove.js

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

export function trackRemoveSubscriber(email) {
    const listItems = document.querySelectorAll("#subscriberList li");
    let index = -1;

    listItems.forEach((li, i) => {
        if (li.textContent.includes(email)) {
            index = i + 1;
        }
    });

    const total = listItems.length;
    const position = `${index}/${total}`;
    const emailType = isGenericEmail(email);

    window.gtag("event", "remove_subscriber", {
        event_category: "subscriber",
        position: position,
        email_type: emailType,
    });
}
