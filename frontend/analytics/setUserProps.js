// frontend/analytics/setUserProps.js

export function setSubscriberCount(count) {
    if (typeof window.gtag === "function") {
        window.gtag("set", "user_properties", {
            subscriber_count: count,
        });
    }
}
