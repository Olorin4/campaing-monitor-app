// frontent/analytics/trackError.js

export function trackApiError(action, message) {
    window.gtag("event", "cm_api_error", {
        event_category: "api",
        action: action, // 'add' or 'remove'
        error_message: message,
    });
}
