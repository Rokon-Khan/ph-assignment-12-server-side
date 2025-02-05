# 📚 EduManagement - Server Side  

🚀 **Frontend Live Demo:** [EduManagement System](https://edu-management-system.surge.sh/)  

## 📖 Overview  

The **EduManagement Server** is a backend system built with **Node.js, Express, MongoDB, and JWT authentication**. It provides secure API endpoints for user authentication, class management, assignment tracking, and data storage.  

---

## 📂 Table of Contents  

- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Dependencies](#dependencies)  
- [API Environment Variables](#api-environment-variables)  
- [Troubleshooting](#troubleshooting)  
- [License](#license)  

---

## 🛠️ Installation  

### Prerequisites  
Ensure you have the following installed on your system:  

- **Node.js** (Latest LTS) → [Download](https://nodejs.org/)  
- **MongoDB** → [Download](https://www.mongodb.com/)  
- **Git** → [Download](https://git-scm.com/)  

### Step 1: Clone the Repository  

```sh
git clone https://github.com/your-repo-link.git
cd your-server-folder
```

### Step 2: Install Dependencies  

```sh
npm install
```

---

## ⚙️ Configuration  

### 📄 Create a `.env` File  

Create a `.env` file in the **root** directory and add the following variables:  

```plaintext
DB_USER=your_database_user
DB_PASS=your_database_pass
ACCESS_TOKEN_SECRET=your_access_token_secret
```

**🔒 Important:** Do **not** commit the `.env` file to Git. Add it to `.gitignore` to keep your credentials secure.  

---

## 🚀 Usage  

### Step 3: Start the Server  

To start the **EduManagement backend**, run:  

```sh
npm start
```

For development mode with **nodemon**:  

```sh
npm run dev
```

The server will be running at **http://localhost:5000/**.  

---

## 📦 Dependencies  

This project uses the following **npm packages**:  

- **dotenv** – Manage environment variables  
- **MongoDB** – Database for storing user and class data  
- **Express** – Backend framework for handling API requests  
- **JWT (jsonwebtoken)** – Secure authentication and authorization  
- **Cookie-parser** – Parse cookies in requests  

Install all dependencies with:  

```sh
npm install
```

---

## 🌍 API Environment Variables  

These are required for backend API communication and database connection.  

| Variable Name         | Description                           |
|-----------------------|---------------------------------------|
| `DB_USER`            | MongoDB database user                 |
| `DB_PASS`            | MongoDB database password             |
| `ACCESS_TOKEN_SECRET`| Secret key for JWT authentication     |

---

## 🛠️ Troubleshooting  

### 1. **MongoDB Connection Issues**  

- Ensure **MongoDB** is running locally or use a **MongoDB Atlas** cloud connection.  
- Verify database credentials in `.env`.  

### 2. **Port Already in Use Error**  

If you see `Error: Port 5000 is already in use`, stop the process using:  

```sh
npx kill-port 5000
```

Or specify another port in `server.js`:  

```js
const PORT = process.env.PORT || 4000;
```

### 3. **JWT Authentication Errors**  

- Ensure `ACCESS_TOKEN_SECRET` is set in `.env`.  
- Make sure tokens are properly stored and sent in API requests.  

---

## 📜 License  

This project is licensed under the **MIT License**.  

---

This README provides everything needed to set up, run, and troubleshoot your **EduManagement Backend**. Let me know if you need any modifications! 🚀




