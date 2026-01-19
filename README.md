<div align="center">
  <br />
  <img src="https://img.shields.io/badge/Status-Production-00C853?style=for-the-badge&logo=github" alt="Status" />
  <img src="https://img.shields.io/badge/Stack-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Security-RLS_Protected-FF4400?style=for-the-badge&logo=shield" alt="Security" />
  <br />

  <h1>MVN FinHub</h1>
  <h3>Simplify Financial Documentation & Legacy Recovery</h3>
  
  <p>
    A strictly non-advisory platform engineered for <strong>Physical Share Recovery</strong>, <strong>IEPF Claims</strong>, and <strong>Financial Compliance</strong>.
  </p>

  <p>
    <a href="mvnfinhub">View Live Platform ➜</a>
    <br />
    <br />
  </p>
</div>

---

## 💎 Project Overview

**MVN FinHub** is a digital infrastructure platform designed to assist High Net-Worth Individuals (HNIs) and families with complex, paper-heavy financial workflows. 

Unlike traditional advisory firms, MVN FinHub operates on a **Process-First Architecture**, strictly separating documentation support from financial advice.

### **Core Capabilities**
* **Legacy Recovery:** Digitization and claim processing for physical share certificates.
* **IEPF Reclamation:** Structured workflows for claiming unclaimed dividends/shares from the Government of India.
* **Status Formalities:** Transmission, RI-to-NRI conversion, and succession documentation.
* **Compliance:** Zero-advisory, documentation-only support model.

---

## 🚀 Key Technical Features

### **1. Zero-Dependency Architecture**
Built on **Vanilla JavaScript (ES6+)**, eliminating the need for heavy frameworks like React or Angular. This ensures:
* **Micro-Latency Load Times:** Sub-500ms initial paint.
* **Long-Term Stability:** Codebase remains functional for years without dependency updates.
* **Maximized Security:** Reduced attack surface area.

### **2. Platinum Glassmorphism UI**
A bespoke design system featuring:
* **Nuclear Dark Mode:** System-aware, deep navy (`#0F172A`) aesthetic for reduced eye strain.
* **Optical Depth:** Multi-layered translucency effects using CSS backdrop filters.
* **Responsive Geometry:** Fluid layouts that adapt from 4K monitors to mobile viewports.

### **3. Secure Enquiry Pipeline**
* **Backend:** Serverless connection to **Supabase (PostgreSQL)**.
* **Security:** Enforced via **Row Level Security (RLS)** policies.
    * *Public Access:* `INSERT` only (Write-only).
    * *Read Access:* Restricted to authenticated admin contexts.

---

## 🛠️ Tech Stack & Infrastructure

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JS | Maximum performance & zero technical debt. |
| **Database** | Supabase (PostgreSQL) | Enterprise-grade SQL power without server management. |
| **Hosting** | GitHub Pages | Immutable, globally distributed static hosting. |
| **Analytics** | GoatCounter | Privacy-focused, cookie-free visitor tracking. |
| **Versioning** | Git / GitHub | Continuous deployment pipeline. |

---

## 📂 Repository Structure

```text
mvnfinhub.github.io/
├── index.html          # Landing: Core Value Proposition
├── services.html       # Module: Recovery & Documentation Services
├── insights.html       # Module: Knowledge Base
├── contact.html        # Module: Secure Enquiry System (RLS)
├── about.html          # Company Philosophy
├── legal.html          # Disclaimer & Non-Advisory Protocol
│
├── public/
│   ├── assets/
│   │   ├── css/        # Modular Architecture (Variables, Components, Utilities)
│   │   ├── js/         # Application Logic (app.js)
│   │   └── images/     # WebP Optimized Assets (3D Renders)
│
├── sitemap.xml         # SEO Indexing Map
└── robots.txt          # Crawler Directives
