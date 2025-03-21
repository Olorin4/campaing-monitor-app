/* frontend/app.js */

function renderSubscribers(subscribers) {
    console.log("Rendering subscribers:", subscribers);
    const list = document.getElementById("subscriberList");
    list.innerHTML = "";

    subscribers.forEach((sub) => {
        const li = document.createElement("li");
        li.textContent = `${sub.Name} (${sub.EmailAddress})`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeSubscriber(sub.EmailAddress);

        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

async function fetchSubscribers() {
    try {
        const res = await fetch("http://localhost:3005/subscribers");

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const subscribersData = await res.json();
        renderSubscribers(subscribersData.Results);
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

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        setTimeout(fetchSubscribers, 1500);
    } catch (error) {
        console.error("Error adding subscriber:", error);
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

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        setTimeout(fetchSubscribers, 1500);
    } catch (error) {
        console.error("Error removing subscriber:", error);
        alert("Error deleting subscriber.");
    }
}

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
