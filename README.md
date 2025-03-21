# Campaign Monitor App

A simple web app that allows users to view, add, and remove subscribers from a Campaign Monitor mailing list.

---

## 🚀 Features

- View active subscribers
- Add new subscribers (email + name)
- Remove existing subscribers
- Fully dynamic frontend with no page reloads

---

## 🧱 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **API:** Campaign Monitor API v3.3

---

## 📋 Short Report

- **Process:** Developed backend API endpoints to communicate with Campaign Monitor, and a frontend interface to consume those APIs dynamically.
- **Decisions:** Used vanilla JS for minimal overhead; opted to serve frontend via Express for simplicity.
- **Challenges:** Campaign Monitor’s authentication required base64 encoding; solved with built-in Node methods.
- **Tools:** Node.js, Fetch API, Express, Git, Prettier + ESLint (for code quality)

---

## 📬 Author

**Nikos Kalaitzidis**  
[GitHub](https://github.com/Olorin4)

---

## 📝 License

This project is licensed under the ISC License.
