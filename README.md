# Campaign Monitor App

A simple web application that allows users to view, add, and remove subscribers from a Campaign Monitor mailing list using their public API.

---

## 🔧 Requirements

- Node.js (v18+)
- npm
- PM2 (for production use)
- Nginx (optional, for reverse proxy)
- A Campaign Monitor account with:
    - API Key
    - List ID

---

## 🔪 Features

- View subscribers
- Add new subscribers with form validation
- Remove existing subscribers
- Fully dynamic frontend (no reloads)
- Clean structure: separate backend logic, validation, and routes

---

## 🚀 Getting Started

To use the app, simply open a browser and visit:

```
http://5.161.229.218
```

You'll be able to view, add, and remove subscribers directly through the web interface. No setup required. _(Note: this link will remain open for a limited time.)_

---

## 🛠 Developer Setup

If you'd like to run the app locally:

1. **Clone the repository:**

```bash
git clone git@github.com:Olorin4/campaign-monitor-app.git
cd campaign-monitor-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment (optional):**

If you want to use environment variables, create a `.env` file in the root with:

```env
API_KEY=your_campaign_monitor_api_key
LIST_ID=your_list_id
PORT=3005
```

4. **Run the app (development mode):**

```bash
npm start
```

Or use PM2 for production:

```bash
pm install -g pm2
pm2 start backend/app.js --name campaign-monitor
pm2 save
pm2 startup
```

The app will be accessible at:

```
http://localhost:3005
```

---
