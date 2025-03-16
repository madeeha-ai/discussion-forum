# Discussion Forum

This project is a full-stack discussion forum built using **React (Frontend)**, **Node.js & Express (Backend)**, and **SQLite (Database)**. Users can create discussion threads, post responses, edit and delete both threads and responses, and filter threads based on categories and activity.

---

## 🚀 Features
- Create, edit, and delete discussion threads.
- Post, edit, and delete responses.
- Filter threads by **category**, **latest activity**, and **number of responses**.
- SQLite database for storing discussions and responses.

---

## 📌 Installation Instructions

### **1️⃣ Clone the Repository**
```sh
  git clone https://github.com/madeeha-ai/discussion-forum.git
  cd discussion-forum
```

### **2️⃣ Install Dependencies**
#### Backend (Server)
```sh
  cd backend
  npm install
```
#### Frontend (React App)
```sh
  cd ../frontend
  npm install
```

---

## ▶️ Start Commands

### **1️⃣ Start the Backend Server**
```sh
  cd backend
  node server.js
```
> The backend runs on `http://localhost:5000`

### **2️⃣ Start the Frontend**
```sh
  cd frontend
  npm run dev
```
> The frontend runs on `http://localhost:5173`

---

## 🗄 Database Setup (SQLite)
- The database file **`forum.db`** is stored in the backend folder.
- If needed, manually reset the database:
  ```sh
  rm backend/forum.db
  node backend/db.js
  ```
- To open the database using SQLite CLI:
  ```sh
  sqlite3 backend/forum.db
  ```

---

## 🛠 API Endpoints (Backend)

### **Threads**
- `GET /api/threads` → Fetch all threads
- `GET /api/threads/:id` → Fetch a single thread
- `POST /api/threads` → Create a new thread
- `PUT /api/threads/:id` → Edit a thread
- `DELETE /api/threads/:id` → Delete a thread

### **Responses**
- `POST /api/threads/responses` → Create a response
- `PUT /api/threads/responses/:id` → Edit a response
- `DELETE /api/threads/responses/:id` → Delete a response

---

## 📂 Project Structure
```
 discussion-forum/
 ├── backend/
 │   ├── db.js         # Database setup (SQLite)
 │   ├── server.js     # Express server setup
 │   ├── routes/       # API Routes
 │   ├── controllers/  # Business logic (CRUD functions)
 │   └── forum.db      # SQLite database file
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── styles/
 │   │   └── App.js
 │   ├── package.json
 │   ├── vite.config.js
 │   └── index.html
 │
 ├── README.md
 ├── .gitignore
 └── package.json
```

---
