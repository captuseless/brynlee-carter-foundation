# Deploy to Vercel Instructions

## Quick Deploy (5 minutes)

### Step 1: Upload to GitHub

1. Go to [github.com](https://github.com) and create a free account (if you don't have one)
2. Click the "+" button → "New repository"
3. Name it: `brynlee-carter-golf`
4. Make it **Public**
5. Click "Create repository"
6. On your computer, open the folder with all these files
7. Follow GitHub's instructions to upload (or use GitHub Desktop app)

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Once logged in, click "Add New..." → "Project"
4. Find your `brynlee-carter-golf` repository
5. Click "Import"
6. **Framework Preset:** Should auto-detect as "Create React App"
7. Click "Deploy"
8. Wait 2-3 minutes ⏱️
9. **DONE!** You'll get a URL like: `brynlee-carter-golf.vercel.app`

### Step 3: Custom Domain (Optional)

After deployment:
1. Go to project settings
2. Click "Domains"
3. Add your custom domain (like `brynleecarterfoundation.org`)
4. Follow DNS instructions

## Files Included

```
brynlee-carter-golf/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── index.js                # Entry point
│   ├── index.css               # Tailwind styles
│   └── App.jsx                 # Main website component
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── .gitignore                  # Files to ignore
└── VERCEL-DEPLOY.md           # This file
```

## Troubleshooting

**Build fails?**
- Make sure all files are uploaded to GitHub
- Check that `package.json` is in the root directory

**Site is blank?**
- Check browser console for errors (F12)
- Make sure all files in `src/` folder were uploaded

**Need help?**
- Contact: Chad Carter (636-368-2059)
- Or: Kyle Ruediger (314-952-9822)

## Alternative: Vercel CLI (Advanced)

If you're comfortable with command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your project folder
cd path/to/your/folder

# Deploy
vercel

# Follow prompts
```

---

#brynleestrong 🐢💚
