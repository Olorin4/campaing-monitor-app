/* backend/app.js */

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
    getSubscribers,
    addSubscriber,
    removeSubscriber,
} from "./controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Middleware
app.get("/subscribers", getSubscribers);
app.post("/subscribers", addSubscriber);
app.delete("/subscribers/:email", removeSubscriber);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
