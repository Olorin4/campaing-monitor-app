# 📈 GA4 + GDPR-Compliant Analytics Integration

This project is a full-stack demo of Google Analytics 4 (GA4) custom event tracking, complete with a consent management solution built using [Silktide's Consent Banner](https://silktide.com/consent-manager/). The app simulates a real-world marketing use case, allowing users to subscribe and unsubscribe from a mailing list via integration with the Campaign Monitor API.

Note: You will need an active Campaign Monitor account with API access and a mailing list created. I’ll guide you on how to retrieve your API key and list ID as part of the setup.

## ✅ Features

- **Manual GA4 integration** (no GTM)
- **Custom event tracking**:
  - `add_subscriber` with time to submit, email type, validation error
  - `remove_subscriber` with list position and email type
  - `cm_api_error` with action type and error message
  - `focus_email_field` and `focus_duration`
- **User property tracking**:
  - Subscriber count
  - Device type
  - User agent
- **GDPR-compliant consent management**
  - Silktide banner blocks GA until explicit consent is given
  - Real-time toggle of tracking via `silktideConsentChange`
  - Rejection disables and removes tracking immediately
- **Modular event tracking** via separate `track*.js` files
- **Campaign Monitor API** integration for real user data flow

## 📸 Screenshots

> Add screenshots of:
> - The consent banner
> - GA4 DebugView or Tag Assistant
> - The UI with subscribers

## 📁 Project Structure

```
/backend           → Node.js API for subscriber management
/frontend
  ├── app.js       → Main frontend logic and API calls
  └── analytics/
        ├── trackAdd.js
        ├── trackRemove.js
        ├── trackError.js
        ├── setUserProps.js
        └── trackFocus.js
```

## 🔐 Consent Flow Summary

1. Consent banner shows on first visit
2. On accept → GA script loads + events start tracking
3. On reject → No GA loaded, all `gtag()` calls are blocked
4. User can change preference dynamically
5. GA tracking is fully disabled on rejection and persists via localStorage

## 📊 Tech Stack

- JavaScript (Vanilla ES6 Modules)
- Google Analytics 4 (`gtag.js`)
- Campaign Monitor API
- Node.js (Express backend)
- Silktide Consent Manager

## 🧪 Tested With

- Chrome Tag Assistant
- GA4 DebugView
- Incognito session toggle
- Manual preference switching

## 📅 Last Updated

April 15, 2025

---

### ⚠️ Disclaimer

This is a demo project built for simulation, analytics testing, and real-world frontend architecture showcasing. Please replace all keys and secrets before using in production.

---

### 👨‍💻 Author

**Nick Kalas**  
http://localhost:3005
```

---
