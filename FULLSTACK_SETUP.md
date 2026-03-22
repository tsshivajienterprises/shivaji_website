# TS SHIVA JI ENTERPRISES - Full Stack Setup Guide

Complete guide to run the frontend and backend together.

## 🏗️ Project Structure

```
ts-shivaji-enterprises/
├── backend/                 # Node.js + Express + PostgreSQL
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── .env
├── src/                     # React + Vite frontend
│   ├── api/                # API integration layer
│   ├── components/
│   ├── hooks/
│   └── ...
├── .env                     # Frontend environment
└── package.json            # Frontend dependencies
```

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

## 🚀 Quick Start (Development)

### Step 1: Clone & Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Setup Backend

```bash
cd backend

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# Required: DATABASE_URL, JWT_SECRET, CLOUDINARY_*, EMAIL_*
nano .env  # or use your preferred editor

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database (creates admin user)
npm run prisma:seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

Default admin credentials:
- Email: `admin@tsshivaji.com`
- Password: `Admin@123`

### Step 3: Setup Frontend

```bash
# In root directory
cp .env.example .env

# Edit .env if needed (default should work)
nano .env

# Start frontend dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Test the Integration

1. Open `http://localhost:5173` in your browser
2. Navigate to Contact section
3. Fill out and submit the form
4. Check backend terminal for enquiry log
5. Check Projects and Gallery sections load

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg
```

### Backend (backend/.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/ts_shivaji_db?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@tsshivaji.com
COMPANY_EMAIL=info@tsshivaji.com
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@tsshivaji.com
ADMIN_PASSWORD=Admin@123
```

## 📦 Database Setup

### PostgreSQL Installation

**macOS (Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb ts_shivaji_db
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb ts_shivaji_db
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### Database Connection String

Format:
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
```

Example:
```
postgresql://postgres:mypassword@localhost:5432/ts_shivaji_db?schema=public
```

## 🎨 Features Connected

### ✅ Contact Form
- Submits enquiries to backend
- Email notifications sent to company
- Loading states and success messages
- Error handling

### ✅ Projects Section
- Fetches featured projects from API
- Displays project images from Cloudinary
- Falls back to static content if API unavailable

### ✅ Gallery Section
- Fetches gallery items from API
- Displays images from Cloudinary
- Falls back to static content if API unavailable

### ✅ WhatsApp Button
- Phone number from settings API
- Dynamic company name

### ✅ Site Settings
- Company info from settings API
- Contact details, address, phone, email

## 🛠️ Development Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
```

## 🧪 Testing the Integration

### 1. Test Contact Form
```bash
# Start both servers
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm run dev

# Open http://localhost:5173
# Fill contact form and submit
# Check backend terminal for logs
```

### 2. Test API Endpoints
```bash
# Health check
curl http://localhost:5000/health

# Get public settings
curl http://localhost:5000/api/settings/public

# Get featured projects
curl http://localhost:5000/api/projects/featured

# Get gallery
curl http://localhost:5000/api/gallery

# Submit enquiry
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "1234567890",
    "email": "test@example.com",
    "message": "Test enquiry"
  }'
```

### 3. Test Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tsshivaji.com",
    "password": "Admin@123"
  }'
```

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in backend/.env
- Check port 5000 is not in use: `lsof -i :5000`

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check VITE_API_BASE_URL in .env
- Check browser console for CORS errors
- Verify FRONTEND_URL in backend/.env

### Database migration errors
```bash
cd backend
npx prisma migrate reset  # Resets database
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed data
```

### Contact form not submitting
- Check browser console for errors
- Verify backend is running
- Check network tab for API call
- Verify email settings in backend/.env

### Images not uploading
- Verify Cloudinary credentials in backend/.env
- Check Cloudinary dashboard for quota
- Test with small image first

## 📱 API Documentation

### Public Endpoints

```
POST   /api/enquiries
POST   /api/callback-requests
GET    /api/projects
GET    /api/projects/featured
GET    /api/projects/:slug
GET    /api/gallery
GET    /api/settings/public
```

### Admin Endpoints (Require JWT)

```
POST   /api/admin/login
GET    /api/admin/me
GET    /api/admin/enquiries
PATCH  /api/admin/enquiries/:id
GET    /api/admin/callbacks
PATCH  /api/admin/callbacks/:id
POST   /api/admin/projects
PATCH  /api/admin/projects/:id
DELETE /api/admin/projects/:id
POST   /api/admin/gallery
PATCH  /api/admin/gallery/:id
DELETE /api/admin/gallery/:id
GET    /api/admin/settings
PATCH  /api/admin/settings
```

## 🚢 Production Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy `dist` folder

3. Set environment variable:
```
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Backend (Railway/Render/DigitalOcean)

1. Push code to Git repository

2. Set environment variables (all from backend/.env)

3. Add build command:
```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

4. Add start command:
```bash
npm start
```

5. Update FRONTEND_URL to production domain

### Database (Production)

Use managed PostgreSQL:
- Railway PostgreSQL
- Render PostgreSQL
- AWS RDS
- DigitalOcean Managed Database

Update DATABASE_URL in backend environment.

## 📊 Database Management

### View Database
```bash
cd backend
npm run prisma:studio
# Opens at http://localhost:5555
```

### Backup Database
```bash
pg_dump ts_shivaji_db > backup.sql
```

### Restore Database
```bash
psql ts_shivaji_db < backup.sql
```

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Regular database backups
- [ ] Keep dependencies updated

## 📚 Additional Resources

- [Backend README](backend/README.md)
- [Integration Guide](INTEGRATION_GUIDE.md)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 🆘 Support

For issues:
1. Check browser console
2. Check backend terminal logs
3. Check database with Prisma Studio
4. Review environment variables
5. Test API endpoints with curl

## 📝 License

Private - TS SHIVA JI ENTERPRISES PVT LTD
