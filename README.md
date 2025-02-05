# PH-Assignment-12 Education Class Management System With Dashboarb JWT, Firebase Authentication & MongoDB CRUD

# https://edu-management-system.surge.sh/

## PH-Assignment-12 Education Class Management System With Dashboard 
- EduManagement is a comprehensive Class Management System designed to streamline the educational experience for both teachers and students. It offers a user-friendly platform to manage classes, assignments, and student progress. Teachers can create and organize courses, track student performance, and provide feedback, while students can easily enroll in classes, access learning materials, and monitor deadlines. With robust security features, real-time notifications, and responsive design, EduManagement ensures seamless learning and teaching across all devices.

## Purpose of the  Education Class Management System of the Website Project

**1. Streamlining Class Management:** Simplify the process of creating, scheduling, and managing classes for teachers, while allowing students to browse and enroll in their preferred courses effortlessly.

**2. Enhancing Communication:** Foster better communication between students and teachers through real-time updates, notifications, and feedback mechanisms.

**3. Tracking Progress:** Equip both teachers and students with tools to monitor performance, submission statuses, and deadlines through a user-friendly dashboard.

**4. Efficient Assignment Management and Organization:** MongoDB's CRUD functionality (Create, Read, Update, Delete) allows for efficiently managing assignments, grades, and student progress. Teachers can easily create new assignments, review student submissions, update grades, and remove irrelevant records, while students can view their assigned tasks and track their completion status.

**5. Secure Data Management:** Leverage robust authentication (e.g., Firebase) and secure storage (e.g., MongoDB) to protect user data and maintain the integrity of the system.


## Key Features of Edu Class Management Website
- User Registration and Authentication: Secure user authentication system using Firebase to allow students and teachers to register and log in with email/password or social media.

1. Role-Based Dashboard: Separate dashboards for teachers and students with tailored functionalities to suit their needs.

2. Class Creation and Enrollment: Teachers can create and manage classes, while students can browse, enroll in, and track their classes.

3. Assignment Management: Teachers can upload, update, and grade assignments, while students can submit their work and receive feedback.

4. Real-Time Progress Tracking: Both students and teachers can track assignment submissions, grades, and deadlines in real time.

5. Responsive Design: A fully responsive interface that works seamlessly on desktops, tablets, and mobile devices for better accessibility.

7. Secure Data Storage: Data is securely stored in MongoDB, with robust authorization using JWT tokens for safe user sessions.

8. Popular Classes Section: Highlight trending or high-enrollment classes to showcase popular courses and encourage participation.

9. Multi-Device Access: Users can access the platform from multiple devices, ensuring their data remains synced and available everywhere.

10. A secure payment sytem with react

## This  Project Use the below NPM Packages
 - dot env
 - mongoDB
 - express
 - jwt
 - json cookie parser

Here’s the updated **README** file for your **EduManagement Server-Side** project with a complete setup guide, including how to configure the `.env` file and start the server.  

---

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




