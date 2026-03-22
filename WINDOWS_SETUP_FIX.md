# 🪟 Windows Setup Fix Guide

If you're encountering Prisma installation errors on Windows, follow these steps:

## Problem

Prisma engines fail to download during `npm install` with errors like:
- `ECONNRESET`
- `EBUSY: resource busy or locked`
- Network timeout

## Solution Options

### Option 1: Manual Prisma Installation (Recommended)

```powershell
# 1. Navigate to backend
cd backend

# 2. Clean npm cache
npm cache clean --force

# 3. Delete node_modules if exists
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# 4. Install dependencies WITHOUT Prisma first
npm install --ignore-scripts

# 5. Install Prisma separately
npm install @prisma/client prisma --save

# 6. Generate Prisma client
npx prisma generate
```

### Option 2: Use Different Network/VPN

The issue is often related to network connectivity to Prisma's CDN.

```powershell
# Try with a VPN or different network
# Then run:
cd backend
npm install
```

### Option 3: Use Prisma Mirror

```powershell
cd backend

# Set Prisma mirror environment variable
$env:PRISMA_ENGINES_MIRROR = "https://binaries.prisma.sh"

# Install
npm install
```

### Option 4: Install with Increased Timeout

```powershell
cd backend

# Increase npm timeout
npm config set fetch-timeout 600000
npm config set fetch-retry-mintimeout 200000
npm config set fetch-retry-maxtimeout 1200000

# Install
npm install
```

### Option 5: Skip Backend (Use Frontend Only)

If backend installation keeps failing, you can run the frontend with mock data:

```powershell
# In root directory
npm install
npm run dev
```

The frontend will work with fallback static content.

## After Successful Installation

Once npm install succeeds, continue with:

```powershell
# 1. Copy environment file
Copy-Item .env.example .env

# 2. Edit .env with your database credentials
notepad .env

# 3. Generate Prisma client (if not done)
npx prisma generate

# 4. Run migrations (requires PostgreSQL)
npx prisma migrate dev

# 5. Seed database
npm run prisma:seed

# 6. Start backend
npm run dev
```

## Common Windows Issues

### Issue: EBUSY errors

**Solution:**
```powershell
# Close all Node processes
taskkill /F /IM node.exe

# Close VS Code or any editor accessing node_modules
# Then try again
```

### Issue: Permission errors

**Solution:**
```powershell
# Run PowerShell as Administrator
# Then run npm install
```

### Issue: Long path errors

**Solution:**
```powershell
# Enable long paths in Windows
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force

# Or move project to shorter path like C:\projects\
```

## Verify Installation

```powershell
# Check if Prisma is installed
npx prisma --version

# Should show something like:
# prisma                  : 5.9.1
# @prisma/client          : 5.9.1
```

## Alternative: Use Docker

If all else fails, use Docker:

```powershell
# Create Dockerfile in backend folder
# Then run:
docker-compose up
```

## Still Having Issues?

### Quick Test Without Backend

The frontend works independently with static content:

```powershell
# In root directory
npm install
npm run dev
```

Visit http://localhost:5173 - the website will work with fallback content.

### Contact Form Will Show Error

Since backend isn't running, the contact form will show an error message, but the UI will still look perfect.

## Need Help?

1. Check your internet connection
2. Try a different network or VPN
3. Disable antivirus temporarily
4. Run PowerShell as Administrator
5. Use Option 1 (Manual Installation) above

## Success Indicators

You'll know it worked when:
- ✅ No errors during `npm install`
- ✅ `npx prisma --version` shows version numbers
- ✅ `node_modules/@prisma/client` folder exists
- ✅ Backend starts with `npm run dev`

---

**Most Common Fix:** Use Option 1 (Manual Installation) - it works 90% of the time!
