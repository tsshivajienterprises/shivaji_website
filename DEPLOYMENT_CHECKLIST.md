# 🚀 Deployment Checklist

Complete checklist for deploying TS SHIVA JI ENTERPRISES to production.

## Pre-Deployment Checklist

### 🔐 Security

- [ ] Change default admin password
- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Review and update CORS origins
- [ ] Enable HTTPS/SSL certificates
- [ ] Review rate limiting settings
- [ ] Audit environment variables
- [ ] Remove development credentials
- [ ] Enable production error logging

### 📧 Email Configuration

- [ ] Set up production email service
- [ ] Configure SMTP credentials
- [ ] Test email delivery
- [ ] Set correct FROM address
- [ ] Set correct COMPANY_EMAIL
- [ ] Test enquiry notifications
- [ ] Test callback notifications

### 🖼️ Image Storage

- [ ] Create Cloudinary account
- [ ] Get API credentials
- [ ] Configure upload folder structure
- [ ] Set image transformation rules
- [ ] Test image uploads
- [ ] Configure CDN settings

### 🗄️ Database

- [ ] Set up production PostgreSQL
- [ ] Create database
- [ ] Update DATABASE_URL
- [ ] Run migrations
- [ ] Seed initial data
- [ ] Set up automated backups
- [ ] Configure connection pooling

### 🌐 Domain & DNS

- [ ] Purchase domain name
- [ ] Configure DNS records
- [ ] Set up SSL certificate
- [ ] Configure CDN (optional)
- [ ] Test domain resolution

## Backend Deployment

### Option 1: Railway

1. **Create Account**
   - [ ] Sign up at railway.app
   - [ ] Connect GitHub account

2. **Create Project**
   - [ ] New Project → Deploy from GitHub
   - [ ] Select repository
   - [ ] Select backend folder

3. **Add PostgreSQL**
   - [ ] Add PostgreSQL plugin
   - [ ] Copy DATABASE_URL

4. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=[from Railway PostgreSQL]
   JWT_SECRET=[generate strong secret]
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=[your value]
   CLOUDINARY_API_KEY=[your value]
   CLOUDINARY_API_SECRET=[your value]
   EMAIL_HOST=[your SMTP host]
   EMAIL_PORT=[your SMTP port]
   EMAIL_USER=[your email]
   EMAIL_PASSWORD=[your password]
   EMAIL_FROM=noreply@yourdomain.com
   COMPANY_EMAIL=info@yourdomain.com
   FRONTEND_URL=https://yourdomain.com
   ```

5. **Build Settings**
   - [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - [ ] Start Command: `npm start`

6. **Deploy**
   - [ ] Push to GitHub
   - [ ] Railway auto-deploys
   - [ ] Check logs for errors
   - [ ] Test API endpoints

### Option 2: Render

1. **Create Account**
   - [ ] Sign up at render.com
   - [ ] Connect GitHub account

2. **Create Web Service**
   - [ ] New → Web Service
   - [ ] Connect repository
   - [ ] Root Directory: `backend`

3. **Add PostgreSQL**
   - [ ] New → PostgreSQL
   - [ ] Copy Internal Database URL

4. **Configure Service**
   - [ ] Name: ts-shivaji-backend
   - [ ] Environment: Node
   - [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - [ ] Start Command: `npm start`

5. **Environment Variables**
   - [ ] Add all variables (same as Railway)

6. **Deploy**
   - [ ] Click "Create Web Service"
   - [ ] Wait for deployment
   - [ ] Check logs
   - [ ] Test endpoints

### Option 3: DigitalOcean App Platform

1. **Create Account**
   - [ ] Sign up at digitalocean.com
   - [ ] Connect GitHub

2. **Create App**
   - [ ] Apps → Create App
   - [ ] Select repository
   - [ ] Select backend folder

3. **Add Database**
   - [ ] Add PostgreSQL database
   - [ ] Copy connection string

4. **Configure**
   - [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - [ ] Run Command: `npm start`
   - [ ] Add environment variables

5. **Deploy**
   - [ ] Review and create
   - [ ] Monitor deployment
   - [ ] Test API

## Frontend Deployment

### Option 1: Vercel

1. **Create Account**
   - [ ] Sign up at vercel.com
   - [ ] Connect GitHub account

2. **Import Project**
   - [ ] New Project
   - [ ] Import repository
   - [ ] Root Directory: `.` (root)

3. **Configure**
   - [ ] Framework Preset: Vite
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`

4. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend.railway.app
   VITE_GOOGLE_MAPS_API_KEY=[your key]
   ```

5. **Deploy**
   - [ ] Click Deploy
   - [ ] Wait for build
   - [ ] Test website
   - [ ] Configure custom domain

### Option 2: Netlify

1. **Create Account**
   - [ ] Sign up at netlify.com
   - [ ] Connect GitHub

2. **Import Project**
   - [ ] New site from Git
   - [ ] Select repository

3. **Configure**
   - [ ] Build command: `npm run build`
   - [ ] Publish directory: `dist`

4. **Environment Variables**
   - [ ] Add VITE_API_BASE_URL
   - [ ] Add VITE_GOOGLE_MAPS_API_KEY

5. **Deploy**
   - [ ] Deploy site
   - [ ] Test website
   - [ ] Configure custom domain

### Option 3: Cloudflare Pages

1. **Create Account**
   - [ ] Sign up at cloudflare.com
   - [ ] Connect GitHub

2. **Create Project**
   - [ ] Pages → Create project
   - [ ] Select repository

3. **Configure**
   - [ ] Framework preset: Vite
   - [ ] Build command: `npm run build`
   - [ ] Build output: `dist`

4. **Environment Variables**
   - [ ] Add VITE_API_BASE_URL
   - [ ] Add VITE_GOOGLE_MAPS_API_KEY

5. **Deploy**
   - [ ] Save and Deploy
   - [ ] Test website
   - [ ] Configure custom domain

## Post-Deployment

### 🧪 Testing

- [ ] Test contact form submission
- [ ] Verify email notifications
- [ ] Test projects display
- [ ] Test gallery display
- [ ] Test WhatsApp button
- [ ] Test admin login
- [ ] Test image uploads
- [ ] Test all API endpoints
- [ ] Test on mobile devices
- [ ] Test on different browsers

### 📊 Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up analytics (Google Analytics)
- [ ] Monitor API response times
- [ ] Monitor database performance
- [ ] Set up alerts for errors

### 🔄 Maintenance

- [ ] Schedule database backups
- [ ] Document deployment process
- [ ] Create rollback plan
- [ ] Set up CI/CD pipeline
- [ ] Plan for updates
- [ ] Monitor logs regularly

### 📝 Documentation

- [ ] Update README with production URLs
- [ ] Document environment variables
- [ ] Create admin user guide
- [ ] Document API endpoints
- [ ] Create troubleshooting guide

## Environment Variables Reference

### Frontend (.env)
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Backend (backend/.env)
```env
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# JWT
JWT_SECRET=your-32-character-secret-key-here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
COMPANY_EMAIL=info@yourdomain.com

# Frontend
FRONTEND_URL=https://yourdomain.com

# Admin (for seeding only)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=change-this-strong-password
```

## Quick Deploy Commands

### Backend (Railway CLI)
```bash
cd backend
railway login
railway init
railway add postgresql
railway up
```

### Frontend (Vercel CLI)
```bash
npm install -g vercel
vercel login
vercel
```

### Frontend (Netlify CLI)
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Rollback Plan

### Backend Rollback
1. [ ] Identify last working commit
2. [ ] Revert to that commit
3. [ ] Push to GitHub
4. [ ] Platform auto-deploys
5. [ ] Verify functionality

### Frontend Rollback
1. [ ] Go to deployment platform
2. [ ] Find previous deployment
3. [ ] Click "Rollback" or "Promote to Production"
4. [ ] Verify website works

### Database Rollback
1. [ ] Stop backend server
2. [ ] Restore from backup
3. [ ] Run migrations if needed
4. [ ] Restart backend
5. [ ] Verify data integrity

## Common Issues & Solutions

### Backend won't start
- [ ] Check environment variables
- [ ] Verify DATABASE_URL
- [ ] Check build logs
- [ ] Verify Node.js version
- [ ] Check for missing dependencies

### Frontend can't connect to backend
- [ ] Verify VITE_API_BASE_URL
- [ ] Check CORS settings
- [ ] Verify backend is running
- [ ] Check network tab in browser
- [ ] Verify SSL certificates

### Database connection fails
- [ ] Check DATABASE_URL format
- [ ] Verify database is running
- [ ] Check connection limits
- [ ] Verify SSL settings
- [ ] Check firewall rules

### Images not uploading
- [ ] Verify Cloudinary credentials
- [ ] Check upload limits
- [ ] Verify file size limits
- [ ] Check network connectivity
- [ ] Review Cloudinary logs

### Emails not sending
- [ ] Verify SMTP credentials
- [ ] Check email service status
- [ ] Verify FROM address
- [ ] Check spam folder
- [ ] Review email logs

## Success Criteria

- [ ] Website loads on production URL
- [ ] Contact form submits successfully
- [ ] Email notifications received
- [ ] Projects display correctly
- [ ] Gallery displays correctly
- [ ] WhatsApp button works
- [ ] Admin can login
- [ ] Images upload successfully
- [ ] All pages load quickly (<3s)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] Monitoring active

## Final Steps

- [ ] Announce launch
- [ ] Update social media
- [ ] Submit to search engines
- [ ] Set up Google Search Console
- [ ] Configure robots.txt
- [ ] Create sitemap.xml
- [ ] Test SEO
- [ ] Monitor first week closely

---

## 🎉 Deployment Complete!

Once all items are checked, your website is live and ready for production use!

**Support Resources:**
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Cloudflare: https://developers.cloudflare.com

**Need Help?**
- Check logs first
- Review documentation
- Test locally
- Check environment variables
- Contact platform support
