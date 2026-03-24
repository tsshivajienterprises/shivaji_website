# 🛠️ TS SHIVA JI ENTERPRICES — Admin Dashboard Documentation

The Admin Dashboard is a secure, premium portal designed to manage the website content, track leads, and monitor site performance. Built with a "Deep Black & Gold" corporate aesthetic, it provides a seamless interface between the website and the Supabase database.

---

## 🚀 Key Modules & Features

### 1. Secure Authentication
- **Portal**: [https://www.tsshivajienterprises.com/admin/login](https://www.tsshivajienterprises.com/admin/login)
- **Admin Access Only**: Protected by JWT (JSON Web Tokens) with 7-day session persistence.
- **Auto-Logout**: Secure session handling for unauthorized attempts.
- **Primary Admin**: `admin@tsshivajienterprises.com` | `Admin@123`

### 2. Dashboard Overview (Live Analytics)
- **Real-time Stat Cards**: 
  - **Total Enquiries**: Fetched from the website contact forms.
  - **Pending Callbacks**: Tracks unresolved return-call requests.
  - **Active Projects**: Current count of items in the portfolio.
  - **Real Site Visits**: Database-backed visitor tracking (Real Total Hits).
- **Recent Enquiries List**: A quick feed of the last 5 customer messages with status indicators.

### 3. Enquiries Management
- **Centralized Lead Hub**: Interactive table to manage all "Contact Us" submissions.
- **Status Updates**: Categorize leads into *New*, *In Progress*, or *Completed*.

### 4. Callback Requests (New Feature)
- **Frontend Submission**: A discreet "Callback" button in the website header allows customers to request a call.
- **Admin Oversight**: View the customer's name, phone, preferred time, and notes.

### 5. Projects & Portfolio CRUD
- **Create / Edit / Delete**: Manage your corporate projects with ease.
- **Image Uploads**: Integrated with Cloudinary for automatic image resizing and high-speed delivery.
- **Featured Toggle**: Mark specific projects to appear prominently on the website homepage.

### 6. Gallery Management
- **Media Grid**: Upload and manage high-resolution site photography.
- **Project Linking**: Link gallery images to specific project categories.

### 7. Universal Site Settings
- **Footer Updates**: Change the phone, email, and company address once here to update the entire website instantly.
- **Map & WhatsApp Sync**: Automatically updates the contact map and WhatsApp button logic.

---

## 🛠️ Technical Stack

- **Frontend**: React 19 + Vite + Tailwind CSS + Framer Motion (Animations).
- **Backend Infrastructure**: Node.js + Express.
- **Database**: PostgreSQL (via Supabase) with Prisma ORM.
- **Media Storage**: Cloudinary (Media Optimization & Hosting).
- **Routing**: `react-router-dom` for SPAs.
- **Hosting**: Vercel (Frontend) and [vercel.json](file:///d:/ts-shiva-ji-enterprices-pvt-ltd/vercel.json) for SPA route rewrites.

---

## 🚨 Final Verification & Setup

1. **Dashboard URL**: `/admin` is the default access point.
2. **Production Routing**: The [vercel.json](file:///d:/ts-shiva-ji-enterprices-pvt-ltd/vercel.json) and [_redirects](file:///d:/ts-shiva-ji-enterprices-pvt-ltd/public/_redirects) files ensure that refreshing the `/admin` page doesn't show a 404.
3. **Environment**: Ensure real credentials for **Cloudinary** and **Email** are set in [backend/.env](file:///d:/ts-shiva-ji-enterprices-pvt-ltd/backend/.env) to enable photo uploads and notifications.

![Final Dashboard Overview](/C:/Users/Admin/.gemini/antigravity/brain/9431a58c-18a7-4e4f-8e12-462151833fb3/admin_dashboard_overview_final_1774376175965.png)
