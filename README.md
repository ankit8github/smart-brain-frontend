# SmartBrain 👁️ – Face Recognition Web App

SmartBrain is a **full-stack face recognition web application**.  
It allows users to **register, sign in, and detect faces in images** by submitting image URLs.  
The project is built with a **React frontend** and a **Node.js + Express backend**, using **PostgreSQL** for database storage and the **Clarifai API** for face detection.  


## ✨ Features
- 🔑 **User Authentication** – Secure registration & login with bcrypt  
- 👤 **Profile Management** – View and manage user profiles  
- 🖼️ **Face Recognition** – Detect faces from submitted image URLs via Clarifai API  
- 📊 **Entry Tracking** – Tracks how many images each user submits  
- 🎨 **Modern UI** – Responsive and clean React interface  
- ⚡ **Seamless Integration** – Full-stack connectivity between frontend & backend  


## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/) – User interface  
- [Tachyons](https://tachyons.io/) – Lightweight CSS styling  
- [Particles.js](https://vincentgarreau.com/particles.js/) – Animated background  

### Backend
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) – REST API server  
- [PostgreSQL](https://www.postgresql.org/) – Database  
- [bcrypt](https://www.npmjs.com/package/bcrypt) – Password hashing  
- [Clarifai API](https://www.clarifai.com/) – Face detection service  


## 📂 Project Structure
smartbrain/
│── smart-brain-frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
│── smart-brain-api/ # Node.js backend
│ ├── server.js
│ └── package.json

## 🚀 Getting Started

### 1️⃣ Clone the repositories
```bash
# Clone frontend
git clone https://github.com/ankit8github/smart-brain-frontend.git
cd smart-brain-frontend
npm install

# Clone backend
git clone https://github.com/ankit8github/smart-brain-api.git
cd smart-brain-api
npm install
2️⃣ Setup Environment

Backend (smart-brain-api) requires:

PostgreSQL installed & running

Database setup with required tables (users, login)

Environment variables for database connection & Clarifai API key

3️⃣ Run the Apps

Backend:

cd smart-brain-api
npm start


Runs on http://localhost:3001 by default.

Frontend:

cd smart-brain-frontend
npm start


Runs on http://localhost:3000 by default.

📡 API Endpoints (Backend)

POST /signin – User login

POST /register – Register new user

GET /profile/:id – Get user profile

PUT /image – Update entries count

POST /imageurl – Handle image URL for face detection

🌐 Deployment

Frontend: Deploy on Netlify, Vercel, or GitHub Pages

Backend: Deploy on Heroku or Render

🤝 Contributing

Contributions are welcome!
Feel free to fork this repo, create a feature branch, and submit a pull request.

📜 License

This project is licensed under the MIT License.
© All Rights Reserved – Designed and Developed by Ankit Kashyap

👤 Author

Ankit Kashyap
📧 Email: ankit.kashyap0221@gmail.com
🔗 GitHub : https://github.com/ankit8github
💼 LinkedIn : https://www.linkedin.com/in/ankitkashyap01/
