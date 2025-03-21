#Campaign Monitor Exercise Report – Nikos Kalaitzidis

##✅ Overall Process

I developed a full-stack web application that connects to the Campaign Monitor API to manage a mailing list. The app allows users to view, add, and remove subscribers via a dynamic browser-based interface. I started by designing a minimal backend with Node.js and Express, followed by a plain JavaScript frontend, and concluded with deployment to a Hetzner server.

##💡 Key Decisions

Used vanilla JavaScript for the frontend to reduce dependencies and keep the UI lightweight.

Chose native fetch over Axios to stay close to browser-native behavior.

Split backend logic into clear modules: controller.js and validation.js, to improve code readability.

Hosted both frontend and backend from the same Express app to simplify deployment and avoid CORS issues.

Skipped optimistic UI updates to follow the instruction to avoid over-engineering.

Known limitation:

There's a deliberate short delay (1.5 seconds) after add/remove actions to ensure Campaign Monitor’s eventual consistency model doesn’t break the immediate UI refresh.

##🐢 What Slowed Me Down

The Campaign Monitor API’s delayed data propagation caused unexpected issues when re-fetching subscribers immediately after changes. This made the UI appear outdated until a delay was added.

Regex and HTML pattern limitations (especially for Unicode characters) led to subtle form validation bugs.

##🛠 Problems & Solutions

❌ Problem: Subscriber list wouldn’t update after changes.
✅ Solution: Introduced a 1500ms delay before calling fetchSubscribers().

❌ Problem: Pattern attribute in HTML caused errors due to character class misuse.
✅ Solution: Simplified regex and moved Unicode support to backend validation.

❌ Problem: Backend was initially rejecting valid names due to misplaced validation timing.
✅ Solution: Trimmed input before calling the validation function.

❌ Problem: GitHub SSH access failed on server.
✅ Solution: Transferred local SSH key to Hetzner and authorized it on GitHub.

##🧰 Tools & Techniques Used

Node.js + Express.js (Backend API)
Vanilla JS + Fetch API (Frontend logic)
PM2 for background process management
Nginx as a reverse proxy
Campaign Monitor API for mailing list integration
Git + SSH for deployment
Hetzner VPS for hosting the live server

The app is currently deployed and accessible at:http://5.161.229.218 (live for demo purposes)

The full source code and setup instructions are included in the ZIP deliverable.
