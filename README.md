# Yousafzai Agri Foods (Pvt Ltd) - Corporate & B2B Web Application

![Yousafzai Agri Foods Logo](./frontend/src/assets/logo.png)

A modern, high-performance corporate and B2B web application for Yousafzai Agri Foods & Poultry Farms. Built with a full-stack architecture, this platform features an interactive 3D supply chain showcase, a responsive GSAP-powered user interface, and a custom Content Management System (CMS) for dynamic updates.

## 🚀 Key Features

- **Interactive 3D Experiences:** Farm-to-market supply chain visualization using Three.js and React Three Fiber.
- **Dynamic Content Management:** Custom-built admin dashboard (`/admin`) for effortless updates to products, team members, and content.
- **High-Performance Animations:** Smooth scrolling and advanced animations powered by Lenis and GSAP.
- **Enterprise-Grade Architecture:** Clean separation of concerns with a dedicated React frontend and an Express/Node.js backend.
- **Secure Authentication:** JWT-based secure login for the administration portal.
- **Cloud Media Storage:** Integrated Cloudinary support for seamless image uploading and CDN delivery.

## 🛠️ Technology Stack

**Frontend:**
- React.js (via Vite)
- Zustand (State Management)
- Tailwind CSS (Styling)
- GSAP & Lenis (Animations & Smooth Scrolling)
- Three.js / React Three Fiber (3D Visuals)

**Backend:**
- Node.js & Express.js
- Sequelize ORM
- MySQL
- JSON Web Tokens (JWT)
- Cloudinary API

## 📂 Project Structure

```text
yousafzai-agri-foods/
├── frontend/           # React SPA, UI Components, 3D Scenes, and Admin Panel
└── backend/            # Express Server, API Routes, DB Models, and Authentication
```

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- MySQL (v8.0+) (via WAMP, XAMPP, or Docker)

### 1. Database Setup
1. Start your local MySQL server.
2. Create a new database named `yousafzai_db` (or your preferred name).

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=yousafzai_db
DB_PORT=3306

# Security
JWT_SECRET=your_super_secret_jwt_key
PORT=4000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## 🌍 Deployment Guide

This repository is optimized for deployment on modern hosting platforms.

- **Frontend:** Can be easily deployed on **Vercel**, **Netlify**, or standard web servers. (Ensure the *Root Directory* is set to `frontend/`).
- **Backend:** Can be deployed on any VPS (e.g., Hostinger KVM, DigitalOcean) using PM2, Docker, or platforms like Render and Heroku.

## 📄 License
All rights reserved. © 2026 Yousafzai Agri Foods (Pvt) Ltd.
