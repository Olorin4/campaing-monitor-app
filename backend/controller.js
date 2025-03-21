// backend/controller.js

import fetch from "node-fetch";

const API_KEY =
    "vCcTEiNcSifcyFMGJTW/92iUaXdHYF6ox0VI4Qr3TGMjy3kIH/luT1+vw2zU1ue9RCO/wu8XGEGXgs7oNleLVrbRnZwTv0DWFkO5jFWM4S1QA8AZmNLluMzP47hJ28pmiZKtCBF9QOFbnrwC07iQFQ==";
const LIST_ID = "f2e23737903ae4fb3eff94e19e16fb8a";
const BASE_URL = "https://api.createsend.com/api/v3.3";

export async function getSubscribers(req, res) {
    try {
        const response = await fetch(
            `${BASE_URL}/lists/${LIST_ID}/active.json?timestamp=${Date.now()}`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(`${API_KEY}:`).toString("base64"),
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Campaign Monitor API error: ${response.statusText}`
            );
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        res.status(500).json({
            error: "Internal server error while fetching subscribers.",
        });
    }
}

export async function addSubscriber(req, res) {
    const { email, name } = req.body;

    try {
        const response = await fetch(
            `${BASE_URL}/subscribers/${LIST_ID}.json`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(`${API_KEY}:`).toString("base64"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    EmailAddress: email,
                    Name: name,
                    ConsentToTrack: "Yes",
                    Resubscribe: true,
                }),
            }
        );

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(
                `Campaign Monitor API error: ${response.statusText}. Details: ${errorDetails}`
            );
        }

        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        console.error("Error adding subscriber:", error);
        res.status(500).json({
            error: "Internal server error while adding subscriber.",
        });
    }
}

export async function removeSubscriber(req, res) {
    const email = req.params.email;

    try {
        const response = await fetch(
            `${BASE_URL}/subscribers/${LIST_ID}.json?email=${encodeURIComponent(email)}`,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(`${API_KEY}:`).toString("base64"),
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Campaign Monitor API error: ${response.statusText}`
            );
        }

        res.json({ message: "Subscriber removed successfully" });
    } catch (error) {
        console.error("Error removing subscriber:", error);
        res.status(500).json({
            error: "Internal server error while removing subscriber.",
        });
    }
}
