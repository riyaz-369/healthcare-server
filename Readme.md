# 🏥 HealthCare

HealthCare is a robust and comprehensive healthcare management system designed to streamline communication and appointment processes between **patients**, **doctors**, and **administrators**.  
Built using **modern web technologies**, it ensures secure data management, real-time communication, and seamless appointment scheduling.

---

## 🚀 Technologies Used

- **Node.js** & **Express.js** – Backend server development
- **Next.js** – React framework for building the frontend (SSR/SPA)
- **Prisma** – ORM for database management
- **PostgreSQL** – Relational database
- **WEB RTC (Agora.io)** – Real-time video/audio communication
- **TypeScript** – Strongly typed JavaScript for scalable development
- **REST API** – Backend API endpoints

---

## 👥 User Roles & Functionalities

### **1. Admin**

- **Account Management**
  - Create and manage doctor accounts
- **Appointment Management**
  - Create and manage doctor appointment slots
  - Change appointment statuses
- **Access to Information**
  - View appointment history and details
  - Access and manage doctor profiles
  - View system metadata

### **2. Doctor**

- **Appointment Management**
  - View upcoming appointments
  - Set available appointment slots
  - Accept and manage appointments
- **Patient Profile**
  - Access patient medical history
  - View uploaded diagnostic test reports
  - Check previous prescriptions
- **Prescription Management**
  - Generate prescriptions during/after consultations
  - Email prescriptions to patients via the system
  - Attach additional medical notes

### **3. Patient**

- **Account Management**
  - Register and manage account details
  - Recover password securely
- **Appointment Booking**
  - Schedule with available time slots & specific doctors
- **Medical Record Management**
  - Maintain medical history & upload test reports
- **Prescription Access**
  - View/download prescriptions via the platform & email
- **Payment & Confirmation**
  - Pay consultation fees
  - Receive invoice via email
  - Automatic cancellation if unpaid after 30 mins
- **Reviews**
  - Rate and review doctors
  - View/manage submitted reviews

---

## ⚙️ System Features

- **Real-time video/audio calls** (WEB RTC via Agora.io) between doctors & patients
- **Secure authentication & authorization**
- **Automated email notifications** (appointments, prescriptions, invoices)
- **Integrated payment system**
- **Comprehensive patient profile management**
- **Doctor profile with availability and specialization details**
- **Server-Side Rendering (SSR)** for better SEO and performance

---

## 📌 Pages & UI Structure

- **Landing Page** – Overview of HealthCare system
- **Doctor Profile Page** – Detailed doctor info & booking options
- **Patient Dashboard** – Appointments, prescriptions, and medical history
- **Admin Dashboard** – Manage doctors, appointments, and system data

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/healthcare.git
cd healthcare
```
