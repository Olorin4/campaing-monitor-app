/* frontend/app.js */

import { trackTypingStart, trackAddSubscriber } from "./analytics/trackAdd.js";
import { trackRemoveSubscriber } from "./analytics/trackRemove.js";
import { trackApiError } from "./analytics/trackError.js";
import { setSubscriberProps } from "./analytics/setUserProps.js";
import { handleFocusStart, handleFocusEnd } from "./analytics/trackFocus.js";

const isLocal = window.location.hostname === "localhost";
const API_URL = isLocal ? "http://localhost:3005" : window.location.origin;

function renderSubscribers(subscribers) {
    console.log("Rendering subscribers:", subscribers);
    const list = document.getElementById("subscriberList");
    list.innerHTML = "";

    subscribers.forEach((sub) => {
        const li = document.createElement("li");
        li.textContent = `${sub.Name} (${sub.EmailAddress})`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            trackRemoveSubscriber(sub.EmailAddress);
            removeSubscriber(sub.EmailAddress);
        };

        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "mobile";
    if (/tablet/i.test(ua)) return "tablet";
    return "desktop";
}

async function fetchSubscribers() {
    try {
        const res = await fetch(`${API_URL}/subscribers`);

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        console.log("Rendering subscribers");
        renderSubscribers(data.Results);
        console.log("Rendering subscribers");
        setSubscriberProps({
            count: data.Results.length,
            deviceType: getDeviceType(),
            userAgent: navigator.userAgent,
        });
    } catch (error) {
        console.error("Error fetching subscribers:", error);
    }
}

async function addSubscriber(email, name) {
    try {
        const res = await fetch(`${API_URL}/subscribers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name }),
        });

        trackAddSubscriber(email, !res.ok);
        if (!res.ok) {
            const text = await res.text();
            const cleanMsg =
                text.match(/<title>(.*?)<\/title>/i)?.[1] ||
                text ||
                "Unknown error";
            throw new Error(`Add failed (${res.status}): ${cleanMsg}`);
        }

        setTimeout(() => {
            console.log("📡 Fetching subscribers after delay...");
            fetchSubscribers();
        }, 1500);
    } catch (error) {
        console.error("Error adding subscriber:", error);
        trackApiError("add", error.message);
        alert("Error adding subscriber.");
    }
}

async function removeSubscriber(email) {
    try {
        const res = await fetch(
            `${API_URL}/subscribers/${encodeURIComponent(email)}`,
            {
                method: "DELETE",
            }
        );

        if (!res.ok) {
            const text = await res.text();
            const cleanMsg =
                text.match(/<title>(.*?)<\/title>/i)?.[1] ||
                text ||
                "Unknown error";
            throw new Error(`Remove failed (${res.status}): ${cleanMsg}`);
        }

        setTimeout(() => {
            console.log("📡 Fetching subscribers after delay...");
            fetchSubscribers();
        }, 1500);
    } catch (error) {
        console.error("Error removing subscriber:", error);
        trackApiError("remove", error.message);
        alert("Error deleting subscriber.");
    }
}

// Track typing + submission
document.getElementById("email").addEventListener("input", trackTypingStart);
document.getElementById("email").addEventListener("focus", handleFocusStart);
document.getElementById("email").addEventListener("blur", handleFocusEnd);

document
    .getElementById("subscriberForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;

        await addSubscriber(email, name);
        e.target.reset();
    });

// initial load
document.addEventListener("DOMContentLoaded", fetchSubscribers);
