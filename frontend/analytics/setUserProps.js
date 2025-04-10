// frontend/analytics/setUserProps.js

export function setSubscriberProps({ count, deviceType, userAgent }) {
    if (typeof window.gtag === "function") {
        window.gtag("set", "user_properties", {
            subscriber_count: count,
            device_type: deviceType,
            user_agent: userAgent,
        });
    }
}
