# PrepPilot - Backend ⚙️

RESTful API backend for PrepPilot placement readiness platform, built with Node.js, Express, and MongoDB Atlas.

🔗 **Live Application:** [https://prep-pilot-frontend-mu.vercel.app/](https://prep-pilot-frontend-mu.vercel.app/)  
🌐 **API Base URL:** `https://preppilot-backend-3z49.onrender.com/api`

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication & Security:** JWT (JSON Web Tokens), bcryptjs, CORS
* **Hosting:** Render

## 📦 API Endpoints
* `POST /api/auth/register` — Candidate registration
* `POST /api/auth/login` — Candidate login & JWT issuance
* `GET /api/practice/questions` — Categorized practice questions

## ⚙️ Local Setup
1. Clone repository:
   ```bash
   git clone [https://github.com/Nishant07-MCA/prepPilot-Backend.git](https://github.com/Nishant07-MCA/prepPilot-Backend.git)
   cd prepPilot-Backend
