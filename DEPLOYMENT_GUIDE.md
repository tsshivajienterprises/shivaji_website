# 🚀 Deployment Guide - tsshivajienterprises.com

## Overview

You'll deploy:
- **Frontend**: https://tsshivajienterprises.com & https://www.tsshivajienterprises.com
- **Backend API**: https://api.tsshivajienterprises.com
- **Database**: Already on Supabase ✅

## 🎯 Recommended Deployment Strategy

### Frontend → Vercel (Free, Best for React/Vite)
### Backend → Render.com (Free tier available)
### Domain → Hostinger (You already have it)

---

## STEP 1: Deploy Backend to Render.com

### 1.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 1.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ts-shivaji-backend`
   - **Region**: Singapore (closest to India)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: 
     ```bash
     npm install && npx prisma generate
     ```
   - **Start Command**: 
     ```bash
     npm start
     ```
   - **Instance Type**: Free

### 1.3 Add Environment Variables
Click "Environment" and add these:

```env
NODE_ENV=production
PORT=5000

# Database (your existing Supabase connection)
DATABASE_URL=postgresql://postgres.bhhpubfcwikytjqajyqr:Supabase%402509@aws-1-ap-south-1.pooler.supabase.com:5432/postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Cloudinary (add your real credentials later)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (add your real Gmail app password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@tsshivajienterprises.com
COMPANY_EMAIL=info@tsshivajienterprises.com

# Frontend URL (update after frontend deployment)
FRONTEND_URL=https://tsshivajienterprises.com

# Admin credentials
ADMIN_EMAIL=admin@tsshivaji.com
ADMIN_PASSWORD=Admin@123
```

### 1.4 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://ts-shivaji-backend.onrender.com`
4. Test it: `https://ts-shivaji-backend.onrender.com/api/projects`

---

## STEP 2: Deploy Frontend to Vercel

### 2.1 Update Frontend Environment Variable
First, update your frontend to use the production API:

Create `.env.production` in root directory:
```env
VITE_API_BASE_URL=https://api.tsshivajienterprises.com
```

### 2.2 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 2.3 Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variable:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://api.tsshivajienterprises.com`

5. Click "Deploy"
6. Wait 2-3 minutes
7. You'll get a URL like: `https://ts-shivaji-enterprices.vercel.app`

---

## STEP 3: Configure Custom Domains in Hostinger

### 3.1 Get Deployment URLs
After deployment, you should have:
- Backend: `https://ts-shivaji-backend.onrender.com`
- Frontend: `https://ts-shivaji-enterprices.vercel.app`

### 3.2 Configure DNS in Hostinger

Login to Hostinger → Domains → tsshivajienterprises.com → DNS/Name Servers

#### For Frontend (www and root domain):

**Add these DNS records:**

1. **A Record** (for root domain):
   - Type: `A`
   - Name: `@`
   - Points to: `76.76.21.21` (Vercel's IP)
   - TTL: 3600

2. **CNAME Record** (for www):
   - Type: `CNAME`
   - Name: `www`
   - Points to: `cname.vercel-dns.com`
   - TTL: 3600

#### For Backend API:

3. **CNAME Record** (for api subdomain):
   - Type: `CNAME`
   - Name: `api`
   - Points to: `ts-shivaji-backend.onrender.com`
   - TTL: 3600

### 3.3 Add Custom Domains in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domains:
   - `tsshivajienterprises.com`
   - `www.tsshivajienterprises.com`
3. Vercel will verify DNS automatically
4. SSL certificates will be issued automatically (takes 5-10 minutes)

### 3.4 Add Custom Domain in Render

1. Go to Render Dashboard → Your Web Service → Settings
2. Scroll to "Custom Domains"
3. Click "Add Custom Domain"
4. Enter: `api.tsshivajienterprises.com`
5. Render will verify DNS
6. SSL certificate issued automatically

---

## STEP 4: Update Backend CORS Settings

Update `backend/src/app.js` to allow your production domain:

```javascript
// Update CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://tsshivajienterprises.com',
    'https://www.tsshivajienterprises.com'
  ],
  credentials: true
}));
```

Commit and push - Render will auto-deploy.

---

## STEP 5: Verify Deployment

### Test Backend API:
```bash
curl https://api.tsshivajienterprises.com/api/projects
```

### Test Frontend:
1. Open https://tsshivajienterprises.com
2. Check if website loads
3. Test contact form submission
4. Check browser console for errors

### Test Full Flow:
1. Go to https://tsshivajienterprises.com
2. Fill contact form
3. Submit
4. Should see success message
5. Check Supabase database for new enquiry

---

## 🔧 Alternative: Deploy Backend to Railway.app

If Render doesn't work, try Railway:

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Add environment variables (same as Render)
6. Railway provides: `https://your-app.up.railway.app`
7. Use this as your API URL

---

## 📋 Deployment Checklist

### Before Deployment:
- [ ] Push all code to GitHub
- [ ] Create `.env.production` with production API URL
- [ ] Update CORS settings in backend
- [ ] Test locally one more time

### Backend Deployment:
- [ ] Create Render/Railway account
- [ ] Deploy backend
- [ ] Add all environment variables
- [ ] Test API endpoint
- [ ] Add custom domain `api.tsshivajienterprises.com`
- [ ] Verify SSL certificate

### Frontend Deployment:
- [ ] Create Vercel account
- [ ] Deploy frontend
- [ ] Add environment variable
- [ ] Test deployment URL
- [ ] Add custom domains (root + www)
- [ ] Verify SSL certificates

### DNS Configuration:
- [ ] Add A record for root domain
- [ ] Add CNAME for www
- [ ] Add CNAME for api subdomain
- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Verify all domains work

### Final Testing:
- [ ] https://tsshivajienterprises.com loads
- [ ] https://www.tsshivajienterprises.com loads
- [ ] https://api.tsshivajienterprises.com/api/projects works
- [ ] Contact form submits successfully
- [ ] Check Supabase for enquiry
- [ ] Test on mobile device
- [ ] Check SSL certificates (green padlock)

---

## 🎯 Quick Start Commands

### Build Frontend Locally (test before deploy):
```bash
npm run build
npm run preview
```

### Build Backend Locally (test before deploy):
```bash
cd backend
npm install
npx prisma generate
npm start
```

---

## 🔐 Security Checklist

Before going live:

1. **Change JWT Secret**:
   - Generate strong random string
   - Update in Render environment variables

2. **Update Admin Password**:
   - Login to admin
   - Change default password

3. **Configure Cloudinary**:
   - Create account at cloudinary.com
   - Get API credentials
   - Update environment variables

4. **Setup Email**:
   - Use Gmail App Password
   - Or use SendGrid/Mailgun for production

5. **Enable Rate Limiting**:
   - Already configured in backend
   - Adjust limits if needed

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Start):
- **Vercel**: Free (100GB bandwidth/month)
- **Render**: Free (750 hours/month, sleeps after 15 min inactivity)
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Hostinger Domain**: ~$10/year (you already have it)

**Total Monthly Cost**: $0 (except domain renewal)

### Paid Tier (When You Grow):
- **Vercel Pro**: $20/month (better performance)
- **Render Starter**: $7/month (no sleep, better resources)
- **Supabase Pro**: $25/month (8GB database, better support)

**Total Monthly Cost**: ~$52/month

---

## 🚨 Common Issues & Solutions

### Issue 1: DNS Not Propagating
**Solution**: Wait 30 minutes, clear browser cache, try incognito mode

### Issue 2: SSL Certificate Error
**Solution**: Wait 10 minutes after DNS propagation, Vercel/Render auto-issue SSL

### Issue 3: CORS Error
**Solution**: Check backend CORS settings include your production domain

### Issue 4: API Not Responding
**Solution**: Check Render logs, verify environment variables, check database connection

### Issue 5: Build Failed
**Solution**: Check build logs, ensure all dependencies in package.json

---

## 📞 Need Help?

If you face issues:
1. Check deployment logs (Vercel/Render dashboard)
2. Check browser console for errors
3. Verify DNS settings in Hostinger
4. Test API directly with curl/Postman
5. Check Supabase connection

---

## 🎉 After Successful Deployment

Your application will be live at:
- 🌐 **Website**: https://tsshivajienterprises.com
- 🌐 **Website (www)**: https://www.tsshivajienterprises.com
- 🔌 **API**: https://api.tsshivajienterprises.com

Share your website with the world! 🚀
