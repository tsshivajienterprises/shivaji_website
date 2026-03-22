# 🚂 Railway Deployment Guide

Complete guide to deploy your backend to Railway (bypasses local Prisma installation issues).

## 🎯 Why Railway?

- ✅ Handles Prisma installation automatically
- ✅ Free PostgreSQL database included
- ✅ No credit card required for starter plan
- ✅ Automatic deployments from GitHub
- ✅ Built-in environment variables management

## 📋 Prerequisites

- ✅ Code pushed to GitHub (Done!)
- ✅ Railway account (you're already there!)

## 🚀 Step-by-Step Deployment

### Step 1: Create New Project

In Railway dashboard:
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `shivaji_website`
4. Railway will detect your project

### Step 2: Add PostgreSQL Database

1. In your project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will create a database and provide connection URL

### Step 3: Configure Backend Service

1. Click on your backend service (should auto-detect `backend` folder)
2. Go to **"Settings"** tab
3. Set **"Root Directory"** to: `backend`
4. Set **"Start Command"** to: `npm start`
5. Set **"Build Command"** to: `npm install && npx prisma generate && npx prisma migrate deploy`

### Step 4: Add Environment Variables

In the backend service, go to **"Variables"** tab and add:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-32-character-key-here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@tsshivaji.com
COMPANY_EMAIL=tsshivajienterprises@gmail.com
FRONTEND_URL=https://your-frontend-url.vercel.app
ADMIN_EMAIL=admin@tsshivaji.com
ADMIN_PASSWORD=Admin@123
```

**Important Notes:**
- `DATABASE_URL` will auto-populate from PostgreSQL service
- Generate a strong `JWT_SECRET` (32+ random characters)
- Add your actual Cloudinary credentials
- Add your actual email credentials
- Update `FRONTEND_URL` after deploying frontend

### Step 5: Deploy!

1. Click **"Deploy"** or push to GitHub
2. Railway will:
   - Install dependencies
   - Download Prisma engines (no network issues!)
   - Generate Prisma client
   - Run database migrations
   - Start your server

3. Monitor deployment in **"Deployments"** tab

### Step 6: Get Your Backend URL

1. Go to **"Settings"** tab
2. Under **"Domains"**, click **"Generate Domain"**
3. Railway will give you a URL like: `https://your-app.railway.app`
4. Copy this URL - you'll need it for frontend!

### Step 7: Seed Database

After first deployment, run seed command:

1. Go to backend service
2. Click **"..."** menu
3. Select **"Run Command"**
4. Enter: `npm run prisma:seed`
5. This creates the admin user

## 🔧 Update Frontend

Update your frontend `.env` file:

```env
VITE_API_BASE_URL=https://your-app.railway.app
```

Then rebuild and redeploy frontend.

## ✅ Verify Deployment

Test your API endpoints:

```bash
# Health check
curl https://your-app.railway.app/health

# Get public settings
curl https://your-app.railway.app/api/settings/public

# Test admin login
curl -X POST https://your-app.railway.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tsshivaji.com","password":"Admin@123"}'
```

## 🎨 Deploy Frontend to Vercel

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Deploy
```powershell
# In root directory
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: ts-shivaji-enterprises
# - Directory: ./
# - Override settings? No
```

### Step 3: Add Environment Variable
```powershell
vercel env add VITE_API_BASE_URL production
# Enter your Railway backend URL
```

### Step 4: Redeploy
```powershell
vercel --prod
```

## 📊 What Railway Does Automatically

✅ Installs Node.js
✅ Runs `npm install`
✅ Downloads Prisma engines (no network issues!)
✅ Generates Prisma client
✅ Runs database migrations
✅ Starts your server
✅ Provides HTTPS
✅ Auto-restarts on crashes
✅ Monitors health
✅ Provides logs

## 🔍 Troubleshooting

### Build Fails

**Check Build Logs:**
1. Go to **"Deployments"** tab
2. Click on failed deployment
3. Check logs for errors

**Common Issues:**
- Missing environment variables
- Database connection failed
- Prisma migration errors

**Solutions:**
- Verify all environment variables are set
- Check DATABASE_URL is correct
- Try manual migration: `npx prisma migrate deploy`

### Database Connection Error

**Fix:**
1. Make sure PostgreSQL service is running
2. Verify `DATABASE_URL` variable is set
3. Check if database is in same project

### Prisma Migration Fails

**Manual Migration:**
1. Go to backend service
2. Click **"..."** → **"Run Command"**
3. Enter: `npx prisma migrate deploy`

### App Crashes on Start

**Check:**
1. Logs in **"Deployments"** tab
2. Verify `PORT` is set to `5000`
3. Check all required env variables are present

## 💰 Railway Pricing

**Starter Plan (Free):**
- $5 free credit per month
- Enough for development and testing
- No credit card required

**Developer Plan ($5/month):**
- $5 credit + $5 usage
- Good for small production apps

**Pro Plan ($20/month):**
- $20 credit + usage
- For production apps with traffic

## 🎯 Expected Timeline

- **Setup**: 5 minutes
- **First Deploy**: 3-5 minutes
- **Subsequent Deploys**: 1-2 minutes

## 📝 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Database created and connected
- [ ] Environment variables set
- [ ] Database seeded (admin user created)
- [ ] API endpoints responding
- [ ] Frontend updated with backend URL
- [ ] Frontend deployed
- [ ] End-to-end testing complete

## 🎉 Success!

Once deployed, you'll have:
- ✅ Backend running on Railway
- ✅ PostgreSQL database on Railway
- ✅ Frontend on Vercel
- ✅ Full-stack app live on internet!

## 🔗 Useful Links

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app
- Vercel Dashboard: https://vercel.com/dashboard
- Your GitHub Repo: https://github.com/tsshivajienterprises/shivaji_website

## 📞 Need Help?

**Railway Support:**
- Discord: https://discord.gg/railway
- Docs: https://docs.railway.app

**Common Questions:**

**Q: How do I view logs?**
A: Go to service → Deployments → Click deployment → View logs

**Q: How do I restart service?**
A: Go to service → Settings → Restart

**Q: How do I add more environment variables?**
A: Go to service → Variables → Add variable

**Q: How do I connect to database?**
A: Use DATABASE_URL from Variables tab

---

**You're almost there!** Just follow these steps and your backend will be live in minutes, bypassing all local installation issues! 🚀
