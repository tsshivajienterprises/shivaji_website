# ⚡ Quick Deployment Reference Card

## 🎯 Your Goal
Deploy to: **https://tsshivajienterprises.com**

---

## 📋 3 Simple Steps

### 1️⃣ Deploy Backend (15 min)
```
1. Go to: https://render.com
2. Sign up with GitHub
3. New Web Service → Select your repo
4. Root Directory: backend
5. Build: npm install && npx prisma generate
6. Start: npm start
7. Add environment variables (copy from backend/.env)
8. Deploy!
```
**Result**: https://your-app.onrender.com

---

### 2️⃣ Deploy Frontend (10 min)
```
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import your repo
4. Framework: Vite
5. Add env: VITE_API_BASE_URL=https://api.tsshivajienterprises.com
6. Deploy!
```
**Result**: https://your-app.vercel.app

---

### 3️⃣ Configure DNS (10 min)
```
1. Login to Hostinger
2. Domains → tsshivajienterprises.com → DNS
3. Add 3 records:
   
   A Record:
   Name: @
   Value: 76.76.21.21
   
   CNAME:
   Name: www
   Value: cname.vercel-dns.com
   
   CNAME:
   Name: api
   Value: your-app.onrender.com

4. In Vercel: Add domains (tsshivajienterprises.com + www)
5. In Render: Add domain (api.tsshivajienterprises.com)
6. Wait 30 minutes for DNS propagation
```

---

## ✅ Test Deployment

```bash
# Test API
curl https://api.tsshivajienterprises.com/health

# Test Website
Open: https://tsshivajienterprises.com
Fill contact form → Submit → Success!
```

---

## 📚 Full Guides Available

- **DEPLOYMENT_STEPS.md** - Detailed step-by-step
- **HOSTINGER_DNS_SETUP.md** - DNS configuration
- **DEPLOYMENT_CHECKLIST.txt** - Track your progress

---

## 💰 Cost: FREE

- Vercel: Free tier
- Render: Free tier  
- Supabase: Free tier
- Domain: Already purchased ✅

---

## ⏱️ Total Time: 1-2 hours

- Deployment: 35 minutes
- DNS propagation: 5-30 minutes
- Testing: 10 minutes

---

## 🆘 Need Help?

1. Check deployment logs
2. Read DEPLOYMENT_GUIDE.md
3. Contact platform support:
   - Vercel: https://vercel.com/support
   - Render: https://render.com/support
   - Hostinger: 24/7 Live Chat

---

## 🎉 Success = 

✅ https://tsshivajienterprises.com (loads)  
✅ https://www.tsshivajienterprises.com (loads)  
✅ https://api.tsshivajienterprises.com/health (returns OK)  
✅ Contact form works  
✅ Green padlock (SSL)  

---

**Ready? Start with DEPLOYMENT_STEPS.md!** 🚀
