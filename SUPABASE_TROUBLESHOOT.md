# 🔧 Supabase Connection Troubleshooting

## ⚠️ CURRENT ISSUE: Cannot Reach Supabase Server

**Error**: `Can't reach database server at db.bhhpubfcwikytjqajyqr.supabase.co`

**Root Cause**: Your network/firewall is blocking connections to Supabase servers.

### What We've Tried:
- ✅ URL-encoded password correctly (`@` → `%40`)
- ✅ Tried direct connection (port 5432)
- ✅ Tried connection pooling (port 6543)
- ❌ DNS cannot resolve Supabase hostname
- ❌ Ping fails to reach server

### This Means:
Your home/corporate network is blocking:
1. DNS resolution to `*.supabase.co` domains
2. Outbound connections to ports 5432 and 6543
3. Possibly all PostgreSQL traffic

## 🎯 SOLUTIONS (Pick One):

### Solution 1: Switch Networks (FASTEST) ⭐
**This is what worked for Prisma installation!**

1. Disconnect from current WiFi
2. Connect to mobile hotspot from your phone
3. Try again:
   ```powershell
   cd backend
   npx prisma db push
   ```

### Solution 2: Use VPN
1. Install a VPN (ProtonVPN, Windscribe have free tiers)
2. Connect to VPN
3. Try database connection again

### Solution 3: Check Supabase Dashboard
The hostname might be wrong. Let's verify:

1. Go to https://supabase.com/dashboard
2. Open your project "ts-shivaji-db"
3. Go to Settings → Database
4. Under "Connection string", verify the host matches:
   `db.bhhpubfcwikytjqajyqr.supabase.co`
5. If different, copy the correct connection string

### Solution 4: Use Different Cloud Database
If Supabase is blocked, try Neon (uses different ports):

1. Go to https://neon.tech
2. Sign up (free)
3. Create new project
4. Copy connection string
5. Update `backend/.env`
6. Try connection

### Solution 5: Deploy Backend to Cloud
Skip local database connection entirely:

1. Deploy backend to Render.com (they handle database)
2. Deploy frontend to Vercel
3. Everything works in cloud

## ✅ Quick Fix Steps:

### Step 1: Verify Supabase Project is Ready
1. Go to your Supabase dashboard
2. Check project status - should say "Healthy"
3. If still setting up, wait 2-3 more minutes

### Step 2: Get Fresh Connection String
1. In Supabase, go to Settings → Database
2. Under "Connection string", click "URI"
3. Copy the FULL string
4. Make sure to replace `[YOUR-PASSWORD]` with: `Supabase%402509`
   (The `@` symbol must be `%40` in URLs)

### Step 3: Test Connection
Try this command to test:
```powershell
cd backend
npx prisma db push
```

### Step 4: Alternative - Use Transaction Pooler
Supabase has two connection modes. Try the pooler:

1. In Supabase Settings → Database
2. Look for "Connection pooling"
3. Copy that connection string instead
4. Use "Transaction" mode
5. Update your .env with that URL

## 🎯 Your Current Connection String Should Be:

```
DATABASE_URL="postgresql://postgres:Supabase%402509@db.bhhpubfcwikytjqajyqr.supabase.co:5432/postgres"
```

Note: `@` in password is encoded as `%40`

## 🔍 Check These:

- [ ] Supabase project status is "Healthy"
- [ ] You're connected to internet
- [ ] Port 5432 is not blocked by firewall
- [ ] Password is correctly URL-encoded (`@` → `%40`)
- [ ] Connection string has no extra spaces

## 💡 Alternative: Use Supabase Direct Connection

Try using the "Direct connection" string instead:

1. Supabase Dashboard → Settings → Database
2. Find "Connection string" section
3. Look for "Direct connection" (not pooler)
4. Copy that URL
5. Update .env

## 🚀 If Still Not Working:

Try using `prisma db push` instead of `migrate deploy`:

```powershell
cd backend
npx prisma db push
```

This is more forgiving with connection issues.

## 📞 Last Resort:

If nothing works, we can:
1. Try a different database (Neon, ElephantSQL)
2. Deploy backend to cloud (Render handles this automatically)
3. Install PostgreSQL locally

Let me know which error you're seeing and I'll help you fix it!
