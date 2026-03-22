# 🚀 Quick Start Guide

Get TS SHIVA JI ENTERPRISES running in 5 minutes!

## Prerequisites
- Node.js 18+
- PostgreSQL 14+

## Setup Steps

### 1️⃣ Install Dependencies (2 min)
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 2️⃣ Configure Backend (1 min)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` - **REQUIRED CHANGES:**
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/ts_shivaji_db"
JWT_SECRET="change-this-to-random-32-character-string"
```

Optional (for full features):
- Cloudinary credentials (for image uploads)
- Email credentials (for notifications)

### 3️⃣ Setup Database (1 min)
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
cd ..
```

### 4️⃣ Configure Frontend (30 sec)
```bash
cp .env.example .env
```

Default `.env` works out of the box:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 5️⃣ Start Servers (30 sec)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Frontend running on http://localhost:5173

## 🎉 You're Done!

Open http://localhost:5173 in your browser.

### Test It:
1. Scroll to Contact section
2. Fill out the form
3. Click Submit
4. See success message ✓

### Admin Login:
- Email: `admin@tsshivaji.com`
- Password: `Admin@123`

## 📁 Project Structure
```
├── src/                    # Frontend (React + Vite)
│   ├── api/               # API integration
│   ├── components/        # React components
│   └── hooks/             # Custom hooks
├── backend/               # Backend (Node.js + Express)
│   ├── src/              # Source code
│   └── prisma/           # Database schema
└── .env                   # Frontend config
```

## 🔗 API Endpoints

**Public:**
- POST `/api/enquiries` - Submit contact form
- GET `/api/projects/featured` - Get featured projects
- GET `/api/gallery` - Get gallery items
- GET `/api/settings/public` - Get site settings

**Admin:**
- POST `/api/admin/login` - Admin login
- GET `/api/admin/enquiries` - View enquiries
- POST `/api/admin/projects` - Create project
- POST `/api/admin/gallery` - Upload gallery image

## 🛠️ Common Commands

```bash
# Frontend
npm run dev              # Start dev server
npm run build            # Build for production

# Backend
cd backend
npm run dev              # Start with auto-reload
npm run prisma:studio    # Open database GUI
npm run prisma:seed      # Reset admin password
```

## 🐛 Troubleshooting

**Backend won't start?**
```bash
# Check PostgreSQL is running
pg_isready

# Check port 5000 is free
lsof -i :5000
```

**Frontend can't connect?**
- Verify backend is running on port 5000
- Check `.env` has correct `VITE_API_BASE_URL`

**Database errors?**
```bash
cd backend
npx prisma migrate reset  # Reset everything
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Create admin user
```

## 📚 Full Documentation

- [Complete Setup Guide](FULLSTACK_SETUP.md)
- [Integration Details](INTEGRATION_GUIDE.md)
- [Backend README](backend/README.md)

## 🎯 What's Connected?

✅ Contact form → Backend API → Email notifications
✅ Projects section → Dynamic from database
✅ Gallery section → Dynamic from database
✅ WhatsApp button → Settings from database
✅ Site settings → Dynamic from database

## 🚢 Next Steps

1. **Change admin password** (important!)
2. **Add Cloudinary credentials** for image uploads
3. **Add email credentials** for notifications
4. **Customize site settings** via Prisma Studio
5. **Add projects and gallery items** via API

## 💡 Pro Tips

- Use `npm run prisma:studio` to view/edit database
- Check browser console for API errors
- Backend logs show all API requests
- Contact form works even without email setup (saves to DB)

---

Need help? Check the full documentation or open an issue!
