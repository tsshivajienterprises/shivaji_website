# 🚀 Quick Deployment Steps

Follow these steps in order to deploy your application to production.

## Prerequisites
- ✅ GitHub account
- ✅ Domain purchased from Hostinger: tsshivajienterprises.com
- ✅ Application working locally

---

## STEP 1: Push Code to GitHub (5 minutes)

If you haven't already:

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Create GitHub repository
# Go to github.com → New Repository → ts-shivaji-enterprices

# Push code
git remote add origin https://github.com/YOUR_USERNAME/ts-shivaji-enterprices.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy Backend (15 minutes)

### Option A: Render.com (Recommended)

1. **Sign up**: https://render.com → Sign up with GitHub

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select your repo

3. **Configure**:
   ```
   Name: ts-shivaji-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npx prisma generate
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables** (copy from `backend/.env`):
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://postgres.bhhpubfcwikytjqajyqr:Supabase%402509@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
   JWT_SECRET=change-this-to-something-very-long-and-random-in-production
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@tsshivajienterprises.com
   COMPANY_EMAIL=info@tsshivajienterprises.com
   FRONTEND_URL=https://tsshivajienterprises.com
   ADMIN_EMAIL=admin@tsshivaji.com
   ADMIN_PASSWORD=Admin@123
   ```

5. **Deploy**: Click "Create Web Service"

6. **Wait**: 5-10 minutes for deployment

7. **Test**: You'll get URL like `https://ts-shivaji-backend.onrender.com`
   - Test: `https://ts-shivaji-backend.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

---

## STEP 3: Deploy Frontend (10 minutes)

### Vercel (Recommended)

1. **Sign up**: https://vercel.com → Sign up with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure**:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**:
   ```
   Name: VITE_API_BASE_URL
   Value: https://api.tsshivajienterprises.com
   ```

5. **Deploy**: Click "Deploy"

6. **Wait**: 2-3 minutes

7. **Test**: You'll get URL like `https://ts-shivaji-enterprices.vercel.app`

---

## STEP 4: Configure DNS in Hostinger (10 minutes)

1. **Login to Hostinger**: https://hostinger.com

2. **Go to**: Domains → tsshivajienterprises.com → DNS/Name Servers

3. **Add DNS Records**:

   **For Frontend (Root Domain)**:
   ```
   Type: A
   Name: @
   Points to: 76.76.21.21
   TTL: 3600
   ```

   **For Frontend (WWW)**:
   ```
   Type: CNAME
   Name: www
   Points to: cname.vercel-dns.com
   TTL: 3600
   ```

   **For Backend API**:
   ```
   Type: CNAME
   Name: api
   Points to: ts-shivaji-backend.onrender.com
   TTL: 3600
   ```

4. **Save Changes**

---

## STEP 5: Add Custom Domains (10 minutes)

### In Vercel:
1. Go to Project → Settings → Domains
2. Add: `tsshivajienterprises.com`
3. Add: `www.tsshivajienterprises.com`
4. Vercel will verify DNS (takes 5-10 minutes)
5. SSL certificates issued automatically

### In Render:
1. Go to Web Service → Settings → Custom Domains
2. Click "Add Custom Domain"
3. Enter: `api.tsshivajienterprises.com`
4. Render will verify DNS
5. SSL certificate issued automatically

---

## STEP 6: Wait for DNS Propagation (5-30 minutes)

DNS changes take time to propagate worldwide.

**Check DNS propagation**:
- https://dnschecker.org
- Enter: tsshivajienterprises.com
- Should show: 76.76.21.21

**Check API subdomain**:
- Enter: api.tsshivajienterprises.com
- Should show: ts-shivaji-backend.onrender.com

---

## STEP 7: Test Production Deployment

### Test Backend:
```bash
curl https://api.tsshivajienterprises.com/health
```
Should return: `{"status":"ok",...}`

```bash
curl https://api.tsshivajienterprises.com/api/projects
```
Should return: `[]` or list of projects

### Test Frontend:
1. Open: https://tsshivajienterprises.com
2. Website should load
3. Check browser console (F12) - no errors
4. Test contact form:
   - Fill form
   - Submit
   - Should see success message

### Test Full Integration:
1. Submit contact form
2. Check Supabase dashboard
3. Go to Table Editor → enquiries
4. Your submission should be there!

---

## 🎉 Success Indicators

- ✅ https://tsshivajienterprises.com loads (green padlock)
- ✅ https://www.tsshivajienterprises.com loads
- ✅ https://api.tsshivajienterprises.com/health returns OK
- ✅ Contact form submits successfully
- ✅ Enquiry appears in Supabase database
- ✅ No console errors

---

## 🚨 Troubleshooting

### "Site can't be reached"
- Wait 30 more minutes for DNS propagation
- Clear browser cache
- Try incognito mode

### "CORS Error"
- Check backend logs in Render
- Verify CORS settings include your domain
- Redeploy backend

### "API not responding"
- Check Render logs
- Verify environment variables
- Check database connection

### "Build failed"
- Check build logs in Vercel/Render
- Verify all dependencies in package.json
- Check Node version compatibility

---

## 📊 Deployment Timeline

- Push to GitHub: 5 minutes
- Deploy Backend: 15 minutes
- Deploy Frontend: 10 minutes
- Configure DNS: 10 minutes
- Add Custom Domains: 10 minutes
- DNS Propagation: 5-30 minutes
- Testing: 10 minutes

**Total: 1-2 hours** (mostly waiting for DNS)

---

## 💡 Pro Tips

1. **Test locally before deploying**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Check build size**:
   - Frontend should be < 5MB
   - Optimize images if needed

3. **Monitor deployments**:
   - Vercel: Auto-deploys on git push
   - Render: Auto-deploys on git push
   - Check deployment logs

4. **Set up monitoring**:
   - Vercel Analytics (free)
   - Render Metrics (free)
   - Supabase Dashboard

5. **Backup database**:
   - Supabase auto-backups on paid plan
   - Export data regularly

---

## 🔐 Security Checklist

Before going live:

- [ ] Change JWT_SECRET to strong random string
- [ ] Update admin password after first login
- [ ] Add real Cloudinary credentials
- [ ] Set up email with app password
- [ ] Enable HTTPS only (automatic with Vercel/Render)
- [ ] Review rate limiting settings
- [ ] Add monitoring/alerts

---

## 📞 Support

If you need help:
1. Check Vercel/Render documentation
2. Check deployment logs
3. Test API with Postman
4. Verify DNS settings
5. Check browser console

---

**Ready to deploy? Start with STEP 1!** 🚀
