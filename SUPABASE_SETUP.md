# 🚀 Supabase Setup - Step by Step

## Step 1: Create Supabase Account (2 minutes)

1. Go to: **https://supabase.com**
2. Click **"Start your project"** (green button)
3. Click **"Sign in with GitHub"** (easiest)
4. Authorize Supabase to access your GitHub

## Step 2: Create New Project (2 minutes)

1. Click **"New Project"** (green button)
2. Fill in:
   ```
   Name: ts-shivaji-db
   Database Password: [Create a strong password - SAVE THIS!]
   Region: Southeast Asia (Singapore) or closest to you
   Pricing Plan: Free
   ```
3. Click **"Create new project"**
4. Wait 2-3 minutes while Supabase sets up your database
   (You'll see a progress indicator)

## Step 3: Get Connection String (1 minute)

Once project is ready:

1. Click **Settings** (gear icon in left sidebar)
2. Click **"Database"** in the settings menu
3. Scroll down to **"Connection string"**
4. Find **"URI"** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **IMPORTANT**: Replace `[YOUR-PASSWORD]` with the password you created in Step 2

## Step 4: Update Backend .env (1 minute)

Open `backend/.env` file and update:

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

Make sure to:
- Replace `YOUR_ACTUAL_PASSWORD` with your password
- Replace `xxxxx` with your actual project ID
- Keep the quotes around the URL

## Step 5: Setup Database (2 minutes)

Run these commands:

```powershell
cd backend

# Generate Prisma client
npx prisma generate

# Create tables in Supabase
npx prisma migrate deploy

# Create admin user and seed data
npm run prisma:seed
```

## Step 6: Start Backend (1 minute)

```powershell
npm run dev
```

You should see:
```
✅ Database connected
🚀 Server running on port 5000
📍 Environment: development
```

## Step 7: Update Frontend (1 minute)

In root directory, edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Step 8: Test Everything! (2 minutes)

1. Make sure frontend is running: `npm run dev` (in root directory)
2. Open: http://localhost:5174
3. Go to **Contact** section
4. Fill out the form:
   ```
   Name: Test User
   Phone: 1234567890
   Email: test@example.com
   Service Interest: Residential
   Message: This is a test enquiry
   ```
5. Click **Submit**
6. Should see: ✅ Success message!

## ✅ Success Indicators

You'll know it's working when:
- ✅ Backend shows "Database connected"
- ✅ No errors in backend terminal
- ✅ Contact form submits successfully
- ✅ Success message appears
- ✅ Form resets after submission

## 🔍 Verify in Supabase

1. Go back to Supabase dashboard
2. Click **"Table Editor"** (in left sidebar)
3. You should see tables:
   - admin_users
   - enquiries
   - callback_requests
   - projects
   - gallery_items
   - site_settings
4. Click **"enquiries"** table
5. You should see your test enquiry!

## 🎉 You're Done!

Your full-stack app is now working:
- ✅ Frontend: http://localhost:5174
- ✅ Backend: http://localhost:5000
- ✅ Database: Supabase (cloud)
- ✅ Contact form: Working end-to-end!

## 📝 Default Admin Credentials

```
Email: admin@tsshivaji.com
Password: Admin@123
```

**⚠️ Change these in production!**

## 🚀 Next Steps

1. **Test all features**:
   - Submit contact forms
   - View projects
   - View gallery

2. **Add content**:
   - Use Prisma Studio: `npx prisma studio`
   - Or build admin dashboard

3. **Deploy to production**:
   - Frontend → Vercel
   - Backend → Render/Railway
   - Database → Already on Supabase!

## 💡 Pro Tips

### View Database:
```powershell
cd backend
npx prisma studio
```
Opens at http://localhost:5555

### Check Logs:
- Backend logs in terminal
- Supabase logs in dashboard → Logs

### Backup Database:
Supabase automatically backs up your database!

## 🔧 Troubleshooting

### "Database connection failed"
- Check DATABASE_URL in .env
- Make sure password is correct
- Verify Supabase project is running

### "Migration failed"
```powershell
# Reset and try again
npx prisma migrate reset
npx prisma migrate deploy
npm run prisma:seed
```

### "Can't connect to Supabase"
- Check your internet connection
- Verify Supabase project is active
- Try regenerating connection string

---

**You're all set!** Follow these steps and your full-stack app will be working in 10 minutes! 🎉
