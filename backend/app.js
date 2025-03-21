/* backend/app.js */

import express from 'express';
import cors from 'cors';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'your_campaign_monitor_api_key';
const LIST_ID = 'your_list_id';
const BASE_URL = 'https://api.createsend.com/api/v3.3';

app.use(express.json());
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Fetch and return active subscribers
app.get('/subscribers', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/lists/${LIST_ID}/active.json`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Campaign Monitor API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ error: 'Internal server error while fetching subscribers.' });
  }
});

// Add a new subscriber
app.post('/subscribers', async (req, res) => {
  const { email, name } = req.body;

  try {
    const response = await fetch(`${BASE_URL}/subscribers/${LIST_ID}.json`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        EmailAddress: email,
        Name: name,
        ConsentToTrack: "Yes"
      })
    });

    if (!response.ok) {
      throw new Error(`Campaign Monitor API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    console.error('Error adding subscriber:', error);
    res.status(500).json({ error: 'Internal server error while adding subscriber.' });
  }
});

// Remove subscriber by email
app.delete('/subscribers/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const response = await fetch(`${BASE_URL}/subscribers/${LIST_ID}.json?email=${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Campaign Monitor API error: ${response.statusText}`);
    }

    res.json({ message: 'Subscriber removed successfully' });
  } catch (error) {
    console.error('Error removing subscriber:', error);
    res.status(500).json({ error: 'Internal server error while removing subscriber.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});