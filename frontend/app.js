/* frontend/app.js */

function renderSubscribers(subscribers) {
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

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const subscribersData = await res.json();
        renderSubscribers(subscribersData.Results);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
    }
}

async function addSubscriber(email, name) {
    try {
        const response = await fetch("http://localhost:3005/subscribers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        await fetchSubscribers();
    } catch (error) {
        console.error("Error adding subscriber:", error);
    }
}

async function removeSubscriber(email) {
    try {
        const response = await fetch(
            `http://localhost:3005/subscribers/${encodeURIComponent(email)}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        await fetchSubscribers();
    } catch (error) {
        console.error("Error removing subscriber:", error);
    }
}

document.getElementById("subscriberForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    addSubscriber(email, name);
    e.target.reset();
});

fetchSubscribers();
