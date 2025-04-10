/* frontend/app.js */

import { trackTypingStart, trackAddSubscriber } from "./analytics/trackAdd.js";
import { trackRemoveSubscriber } from "./analytics/trackRemove.js";
import { trackApiError } from "./analytics/trackError.js";
import { setSubscriberCount } from "./analytics/setUserProps.js";
import { trackFocus } from "./analytics/trackFocus.js";

const API_URL = window.location.origin;

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

async function fetchSubscribers() {
    try {
        const res = await fetch("http://localhost:3005/subscribers");

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        renderSubscribers(data.Results);
        setSubscriberCount(data.Results.length);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
    }
}

async function addSubscriber(email, name) {
    try {
        const res = await fetch("http://localhost:3005/subscribers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name }),
        });

        trackAddSubscriber(email, !res.ok);
        if (!res.ok) {
            throw new Error(
                `Add failed (${res.status}): ${res.text || "No response body"}`
            );
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
            `http://localhost:3005/subscribers/${encodeURIComponent(email)}`,
            {
                method: "DELETE",
            }
        );

        if (!res.ok) {
            throw new Error(
                `Remove failed (${res.status}): ${res.text || "No response body"}`
            );
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
document.getElementById("email").addEventListener("focus", trackFocus);

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
