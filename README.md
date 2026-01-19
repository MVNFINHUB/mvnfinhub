<div align="center">
  <img src="public/assets/images/logo-3d-full.png" alt="MVN FinHub Logo" width="120" />
  <h1>MVN FinHub</h1>
  <p>
    <strong>Simplify Financial Documentation & Legacy Recovery</strong>
  </p>
  <p>
    <a href="https://mvnfinhub.github.io/">View Live Platform ➜</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Production_Ready-0F172A?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/Stack-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
    <img src="https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Security-RLS_Enabled-blue?style=for-the-badge" alt="Security" />
  </p>
</div>

---

## 💎 Project Overview

**MVN FinHub** is a strictly non-advisory financial support platform designed to assist clients with complex documentation workflows, including **Physical Share Recovery**, **IEPF Claims**, and **Status Change Formalities**.

The platform is engineered for **speed, privacy, and visual excellence**, featuring a bespoke "Platinum Glass" UI and a "Nuclear" Dark Mode for seamless day/night usability.

## 🚀 Key Features

* **Premium UI/UX:** Custom "Prism Glass" glassmorphism design with dynamic lighting effects.
* **Performance First:** Built on Zero-Dependency Vanilla JavaScript (No frameworks, no bloat).
* **Adaptive Theme:** "Nuclear" Dark Mode detection with glitch-free scrolling and deep navy aesthetics.
* **Secure Backend:** Contact forms integrated with **Supabase (PostgreSQL)**, secured via **Row Level Security (RLS)** policies.
* **SEO Optimized:** Full semantic HTML5 structure, Open Graph tags, and automated Sitemap generation.

## 🛠️ Technical Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JS | Semantic structure, CSS Variables for theming, ES6+ logic. |
| **Styling** | Custom CSS Architecture | Component-based CSS (`components.css`, `variables.css`). |
| **Backend** | Supabase (BaaS) | Serverless PostgreSQL database for handling enquiries. |
| **Security** | Row Level Security (RLS) | Restricts DB access to `INSERT` only for public users. |
| **Hosting** | GitHub Pages | High-availability static hosting. |

## 📂 Project Structure

```bash
mvnfinhub.github.io/
├── index.html          # Landing Page
├── services.html       # Service Offerings
├── contact.html        # Secure Enquiry Form
├── public/
│   ├── assets/
│   │   ├── css/        # Modular Styles (main, variables, components)
│   │   ├── js/         # Logic (app.js - Dark Mode, Form Handling)
│   │   └── images/     # Optimized WebP/PNG Assets
├── sitemap.xml         # Search Engine Map
└── robots.txt          # Crawler Directives
