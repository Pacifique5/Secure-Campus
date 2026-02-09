# 🚀 Deploy SecureCampus - Step by Step

Follow these exact steps. Copy and paste what you need.

---

## 📋 What You Need

- [ ] GitHub account
- [ ] Your code pushed to GitHub
- [ ] 20 minutes

---

## STEP 1: Deploy Backend on Render (10 min)

### 1.1 Create Account
1. Go to **https://render.com**
2. Click **"Get Started"**
3. Sign up with GitHub
4. Authorize Render

### 1.2 Create Database
1. Click **"New +"** → **"PostgreSQL"**
2. Fill in:
   ```
   Name: securecampus-db
   Database: securecampus
   User: securecampus
   Region: [Choose closest to you]
   Plan: Free
   ```
3. Click **"Create Database"**
4. **WAIT** for it to be ready (1-2 minutes)
5. **COPY** the **"Internal Database URL"** (starts with `postgresql://`)
   - Click on the database name
   - Find "Internal Database URL"
   - Click copy icon
   - **SAVE THIS** - you'll need it in next step!

### 1.3 Create Backend Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Connect your GitHub repository
4. Fill in:
   ```
   Name: securecampus-backend
   Region: [Same as database]
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npx prisma generate && npm run build
   Start Command: npm run start:prod
   Instance Type: Free
   ```

### 1.4 Add Environment Variables
Scroll down to **"Environment Variables"** section:

Click **"Add Environment Variable"** for each:

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: DATABASE_URL
Value: [PASTE YOUR DATABASE URL FROM STEP 1.2]
```

**Variable 3:** (Generate a random secret)
```
Key: JWT_SECRET
Value: [Run this in your terminal to generate:]
```
**Windows (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```
**Mac/Linux:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste as value.

**Variable 4:**
```
Key: JWT_EXPIRES_IN
Value: 7d
```

**Variable 5:**
```
Key: PORT
Value: 3001
```

**Variable 6:** (Leave empty for now, we'll add this later)
```
Key: FRONTEND_URL
Value: [Leave empty - we'll fill this after deploying frontend]
```

### 1.5 Deploy Backend
1. Click **"Create Web Service"**
2. **WAIT** for deployment (5-10 minutes)
   - Watch the logs
   - Wait until you see "Live" status

### 1.6 Run Database Setup
1. Once deployed, click on your service
2. Click **"Shell"** tab (top right)
3. Run these commands one by one:
   ```bash
   npx prisma migrate deploy
   ```
   Wait for it to finish, then:
   ```bash
   npm run prisma:seed
   ```

### 1.7 Save Your Backend URL
1. At the top of your service page, you'll see a URL like:
   ```
   https://securecampus-backend-xxxx.onrender.com
   ```
2. **COPY THIS URL** - you'll need it for frontend!

**✅ Backend Done!**

---

## STEP 2: Deploy Frontend on Vercel (5 min)

### 2.1 Create Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with GitHub
4. Authorize Vercel

### 2.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository and click **"Import"**
3. Configure:
   ```
   Framework Preset: Next.js (auto-detected)
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

### 2.3 Add Environment Variable
1. Expand **"Environment Variables"** section
2. Add this variable:
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: [PASTE YOUR BACKEND URL FROM STEP 1.7]
   ```
   Example: `https://securecampus-backend-xxxx.onrender.com`

3. Make sure these are checked:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### 2.4 Deploy Frontend
1. Click **"Deploy"**
2. **WAIT** for deployment (2-3 minutes)
3. Once done, you'll see your URL like:
   ```
   https://securecampus-xxxx.vercel.app
   ```
4. **COPY THIS URL** - you need it for the next step!

**✅ Frontend Done!**

---

## STEP 3: Connect Frontend & Backend (2 min)

### 3.1 Update Backend with Frontend URL
1. Go back to **Render Dashboard**
2. Click on your **backend service**
3. Click **"Environment"** tab (left sidebar)
4. Find the **FRONTEND_URL** variable
5. Click **"Edit"** (pencil icon)
6. Paste your Vercel URL:
   ```
   https://securecampus-xxxx.vercel.app
   ```
7. Click **"Save Changes"**
8. **WAIT** for automatic redeploy (1-2 minutes)

**✅ Everything Connected!**

---

## STEP 4: Test Your App (2 min)

### 4.1 Open Your App
1. Go to your Vercel URL: `https://securecampus-xxxx.vercel.app`
2. You should see the SecureCampus home page

### 4.2 Test Login
Use these default credentials:

**Admin Account:**
```
Email: admin@securecampus.com
Password: admin123
```

**Student Account:**
```
Email: student@securecampus.com
Password: student123
```

### 4.3 Test Features
- [ ] Can login
- [ ] Dashboard loads
- [ ] Dark mode toggle works (🌙/☀️ button)
- [ ] Can navigate between pages
- [ ] Data loads correctly

**⚠️ IMPORTANT:** Change the default passwords after first login!

---

## 🎉 YOU'RE LIVE!

Your app is now deployed at:
- **Frontend**: `https://securecampus-xxxx.vercel.app`
- **Backend**: `https://securecampus-backend-xxxx.onrender.com`

---

## 🐛 Troubleshooting

### Problem: "CORS Error" in browser console
**Fix:**
1. Go to Render → Backend Service → Environment
2. Make sure `FRONTEND_URL` is set to your exact Vercel URL
3. Save and wait for redeploy

### Problem: "Cannot connect to API"
**Fix:**
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Make sure `NEXT_PUBLIC_API_URL` is set to your exact Render backend URL
3. Redeploy frontend

### Problem: Backend shows "Application failed to respond"
**Fix:**
1. Check Render logs for errors
2. Make sure `DATABASE_URL` is the **Internal** URL from Render
3. Try redeploying

### Problem: Database connection error
**Fix:**
1. Go to Render Shell
2. Run: `npx prisma migrate deploy`

---

## 📝 Save Your URLs

Write these down:

```
Frontend URL: _________________________________
Backend URL: _________________________________
Database: Render Dashboard → PostgreSQL
```

---

## 🔄 To Update Your App Later

Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Render and Vercel will automatically redeploy! 🚀

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- Check the logs in both dashboards

---

**That's it! You're deployed!** 🎊
