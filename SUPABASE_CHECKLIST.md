# ✅ Supabase Setup Checklist

## 🎯 Follow These Steps in Order

### □ Step 1: Create Supabase Account
- [ ] Go to https://supabase.com
- [ ] Click "Start your project"
- [ ] Sign in with GitHub
- [ ] Authorize Supabase

### □ Step 2: Create Project
- [ ] Click "New Project"
- [ ] Name: `ts-shivaji-db`
- [ ] Create strong password (SAVE IT!)
- [ ] Choose region (Singapore or closest)
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes

### □ Step 3: Get Connection String
- [ ] Click Settings (gear icon)
- [ ] Click "Database"
- [ ] Find "Connection string" section
- [ ] Click "URI" tab
- [ ] Copy the connection string
- [ ] Replace `[YOUR-PASSWORD]` with your actual password

### □ Step 4: Update Backend .env
```powershell
cd backend
notepad .env
```
- [ ] Paste your Supabase connection string in `DATABASE_URL`
- [ ] Make sure password is correct
- [ ] Save file

### □ Step 5: Setup Database
```powershell
cd backend
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
```
- [ ] All commands run without errors
- [ ] See "Database connected" message

### □ Step 6: Start Backend
```powershell
npm run dev
```
- [ ] Backend starts successfully
- [ ] See "Server running on port 5000"
- [ ] No errors in terminal

### □ Step 7: Update Frontend .env
```powershell
# In root directory
notepad .env
```
- [ ] Set `VITE_API_BASE_URL=http://localhost:5000`
- [ ] Save file

### □ Step 8: Restart Frontend
```powershell
# Stop current server (Ctrl+C)
npm run dev
```
- [ ] Frontend restarts successfully
- [ ] Opens at http://localhost:5174

### □ Step 9: Test Contact Form
- [ ] Open http://localhost:5174
- [ ] Scroll to Contact section
- [ ] Fill out form
- [ ] Click Submit
- [ ] See success message ✅
- [ ] Form resets

### □ Step 10: Verify in Supabase
- [ ] Go to Supabase dashboard
- [ ] Click "Table Editor"
- [ ] See all tables created
- [ ] Click "enquiries" table
- [ ] See your test enquiry

## 🎉 Success!

If all checkboxes are checked, your full-stack app is working!

## 📊 What You Have Now

- ✅ Frontend running locally
- ✅ Backend running locally
- ✅ Database on Supabase (cloud)
- ✅ Contact form working end-to-end
- ✅ Admin user created
- ✅ All tables created

## 🚀 Ready for Production!

Your app is now ready to deploy:
- Frontend → Vercel
- Backend → Render/Railway
- Database → Already on Supabase!

---

**Time to complete:** ~10 minutes
**Difficulty:** Easy
**Result:** Working full-stack app! 🎊
