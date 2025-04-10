// frontend/analytics/setUserProps.js

export function setSubscriberCount(count) {
    window.gtag("set", "user_properties", {
        subscriber_count: count,
    });
}
