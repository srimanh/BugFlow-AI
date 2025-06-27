# 🐞 BugFlow AI – Intelligent Bug Tracking System

BugFlow AI is a full-stack bug tracking system designed for teams to report, assign, and resolve bugs with AI-powered suggestions. Built with **Spring Boot + PostgreSQL**, it supports **role-based workflows** and is ready for AI and frontend integration.

---

## 🚀 Features

- 👥 **User Registration & Login**
- 🔐 **JWT Authentication + BCrypt Password Encryption**
- 🧩 **Role-Based Access Control (Tester, Manager, Developer)**
- 🐛 **Bug Reporting, Assigning, and Status Management**
- 🤖 **AI Suggestions** (mock for now, OpenAI integration upcoming)
- 📦 **Project Module Tracking** (coming soon)
- 📘 **Swagger API Docs**
- 🔐 **Secure API with Role-Based Restrictions**

---

## 🛠️ Tech Stack

| Layer         | Technology                         |
|---------------|-------------------------------------|
| Backend       | Java + Spring Boot (v3.5.3)         |
| Security      | Spring Security + JWT               |
| Database      | PostgreSQL                          |
| Build Tool    | Gradle                              |
| Docs          | Swagger / OpenAPI                   |
| AI (Mocked)   | Java-based simulated AI responses   |

---

## 🔐 Security Highlights

- ✅ JWT-based stateless authentication
- ✅ Passwords encrypted with **BCrypt**
- ✅ Swagger is open only to public auth routes
- ✅ Role-based restrictions with `@PreAuthorize`

---

✅ How to Run

./gradlew clean
./gradlew bootRun