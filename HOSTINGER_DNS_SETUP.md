# 🌐 Hostinger DNS Configuration

## Exact DNS Records to Add

Login to Hostinger → Domains → tsshivajienterprises.com → DNS/Name Servers

---

## Record 1: Root Domain (tsshivajienterprises.com)

```
Type: A
Name: @
Value/Points to: 76.76.21.21
TTL: 3600
```

**Purpose**: Points your main domain to Vercel's servers

---

## Record 2: WWW Subdomain (www.tsshivajienterprises.com)

```
Type: CNAME
Name: www
Value/Points to: cname.vercel-dns.com
TTL: 3600
```

**Purpose**: Points www version to Vercel

---

## Record 3: API Subdomain (api.tsshivajienterprises.com)

```
Type: CNAME
Name: api
Value/Points to: ts-shivaji-backend.onrender.com
TTL: 3600
```

**Purpose**: Points API subdomain to your Render backend

**Note**: Replace `ts-shivaji-backend.onrender.com` with your actual Render URL

---

## Visual Guide

### Before (Default Hostinger DNS):
```
Type    Name    Value                           TTL
A       @       [Hostinger IP]                  3600
CNAME   www     tsshivajienterprises.com        3600
```

### After (Your Configuration):
```
Type    Name    Value                           TTL
A       @       76.76.21.21                     3600
CNAME   www     cname.vercel-dns.com            3600
CNAME   api     ts-shivaji-backend.onrender.com 3600
```

---

## Step-by-Step in Hostinger

### 1. Login to Hostinger
- Go to https://hostinger.com
- Login with your credentials

### 2. Navigate to DNS Settings
- Click on "Domains" in sidebar
- Find "tsshivajienterprises.com"
- Click "Manage"
- Click "DNS / Name Servers" tab

### 3. Modify/Add A Record
- Look for existing A record with Name "@"
- Click "Edit" or "Add Record"
- Change/Set:
  - Type: A
  - Name: @
  - Points to: 76.76.21.21
  - TTL: 3600
- Click "Save"

### 4. Modify/Add WWW CNAME
- Look for existing CNAME with Name "www"
- Click "Edit" or "Add Record"
- Change/Set:
  - Type: CNAME
  - Name: www
  - Points to: cname.vercel-dns.com
  - TTL: 3600
- Click "Save"

### 5. Add API CNAME
- Click "Add Record"
- Set:
  - Type: CNAME
  - Name: api
  - Points to: ts-shivaji-backend.onrender.com
  - TTL: 3600
- Click "Save"

---

## Important Notes

### About TTL (Time To Live)
- 3600 seconds = 1 hour
- This is how long DNS servers cache the record
- Lower TTL = faster updates, more DNS queries
- 3600 is a good balance

### About the @ Symbol
- @ means "root domain"
- It represents tsshivajienterprises.com itself
- Don't type the full domain, just use @

### About CNAME Records
- CNAME = Canonical Name (alias)
- Points one domain to another
- Cannot be used for root domain (that's why we use A record)

---

## Verification

### Check DNS Propagation
After adding records, check propagation:

1. **Go to**: https://dnschecker.org

2. **Check Root Domain**:
   - Enter: tsshivajienterprises.com
   - Type: A
   - Should show: 76.76.21.21

3. **Check WWW**:
   - Enter: www.tsshivajienterprises.com
   - Type: CNAME
   - Should show: cname.vercel-dns.com

4. **Check API**:
   - Enter: api.tsshivajienterprises.com
   - Type: CNAME
   - Should show: ts-shivaji-backend.onrender.com

### Timeline
- Local DNS: 5-10 minutes
- Global DNS: 30 minutes to 24 hours
- Usually works within 30 minutes

---

## Common Issues

### Issue 1: "Record already exists"
**Solution**: Edit the existing record instead of adding new one

### Issue 2: "Invalid value"
**Solution**: 
- For A record: Use IP only (76.76.21.21)
- For CNAME: Don't add http:// or https://
- For CNAME: Don't add trailing dot unless required

### Issue 3: "Changes not reflecting"
**Solution**: 
- Wait 30 minutes
- Clear browser cache
- Try incognito mode
- Check dnschecker.org

### Issue 4: "SSL Certificate Error"
**Solution**: 
- Wait for DNS to propagate first
- Then Vercel/Render will auto-issue SSL
- Takes 5-10 minutes after DNS propagation

---

## Alternative: Using Hostinger Nameservers

If you want to use Vercel/Render nameservers instead:

### For Vercel:
1. In Vercel, go to Domains → Add Domain
2. Vercel will give you nameservers
3. In Hostinger, change nameservers to Vercel's
4. This gives Vercel full DNS control

### For Render:
1. Similar process
2. Render provides nameservers
3. Change in Hostinger

**Recommendation**: Use DNS records method (above) - it's simpler and you keep control in Hostinger.

---

## Testing After DNS Setup

### Test 1: Ping Test
```bash
ping tsshivajienterprises.com
ping www.tsshivajienterprises.com
ping api.tsshivajienterprises.com
```

Should resolve to correct IPs.

### Test 2: Browser Test
```
https://tsshivajienterprises.com
https://www.tsshivajienterprises.com
https://api.tsshivajienterprises.com/health
```

All should load with green padlock (SSL).

### Test 3: DNS Lookup
```bash
nslookup tsshivajienterprises.com
nslookup www.tsshivajienterprises.com
nslookup api.tsshivajienterprises.com
```

Should show correct values.

---

## Summary

**3 DNS Records to Add**:
1. A record: @ → 76.76.21.21
2. CNAME: www → cname.vercel-dns.com
3. CNAME: api → ts-shivaji-backend.onrender.com

**Wait**: 30 minutes for propagation

**Result**: 
- ✅ https://tsshivajienterprises.com
- ✅ https://www.tsshivajienterprises.com
- ✅ https://api.tsshivajienterprises.com

---

## Need Help?

If DNS setup is confusing:
1. Contact Hostinger support (they can add records for you)
2. Share this document with them
3. They'll configure it in 5 minutes

Or take screenshots of your Hostinger DNS panel and I can guide you through it!
