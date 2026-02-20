# HRMS Lite (MyHRMS)

A lightweight full-stack HRMS (Human Resource Management System) application built to manage employees and track daily attendance.  
This project is designed as a clean, simple, and production-style internal tool for a single admin.

---

## 🚀 Project Overview

The HRMS Lite application allows an admin to:

- Manage employees:
  - Add new employees
  - View all employees
  - Delete employees
- Manage attendance:
  - Mark attendance (present/absent) for an employee on a given date
  - View attendance records for each employee

Key focus:
- Clean UI
- RESTful backend APIs
- Proper validations & error handling
- Persistent database storage
- Deployed-ready structure

---

## 🛠️ Tech Stack Used

### Frontend
- Next.js
- JavaScript
- Fetch API for backend communication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Other Tools
- Git & GitHub (version control)
- npm (package manager)

---

## 📦 Steps to run Project Locally 

Backend Setup-

cd mrhms/backend
npm install

create a .env file inside backend folder and add:
PORT=5000
MONGO_URI=mongodb+srv://sumitbangar83_db_user:DFpdA1MFhH8ExqTA@cluster0.gmeiwwl.mongodb.net/?appName=Cluster0

Run backend server: - 
nodemon src/server.js

Connect Frontend with Backend -
Make sure frontend API base URL points to:
http://localhost:5000/api
