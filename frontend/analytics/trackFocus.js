// frontend/analytics/trackFocus.js

export function trackFocus() {
    window.gtag("event", "focus_email_field", {
        event_category: "form",
    });
}
