# Vercel Deployment Guide

## Quick Deploy to Vercel

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)

2. **Sign up/Login**: Use your GitHub account

3. **Import Project**: 
   - Click "New Project"
   - Select this repository: `TCU-DCDA/WRIT40363`
   - Set **Root Directory** to: `Musk_Watcher/musk-tracker-app`

4. **Deploy**: Click "Deploy" - Vercel will automatically:
   - Run `npm install`
   - Run `npm run build` 
   - Deploy the app

## Environment Variables (if needed)
No environment variables required for basic deployment.

## Expected URL
Your app will be available at: `https://your-project-name.vercel.app`

## Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from the app directory
cd Musk_Watcher/musk-tracker-app
vercel --prod
```

## Files configured for Vercel:
- ✅ `vercel.json` - Deployment configuration
- ✅ `package.json` - Build scripts
- ✅ `Procfile` - Alternative platform support

The app is ready to deploy!
