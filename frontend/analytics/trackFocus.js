// frontend/analytics/trackFocus.js

let focusStartTime = null;

export function handleFocusStart() {
    focusStartTime = Date.now();
}

export function handleFocusEnd() {
    if (!focusStartTime) return;

    const timeInField = Date.now() - focusStartTime;
    focusStartTime = null; // reset

    if (typeof window.gtag === "function") {
        window.gtag("event", "focus_duration", {
            event_category: "form",
            duration_ms: timeInField,
        });
    }
}
