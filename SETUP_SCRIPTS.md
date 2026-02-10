# 🚀 Quick Start Scripts

These scripts automatically set up and run the AI Mentor project on any new computer.

## Windows Users

### Option 1: Double-Click (Easiest)
1. Find `setup.bat` in the project folder
2. **Double-click it**
3. Wait for dependencies to install
4. Browser opens automatically at http://localhost:3000

### Option 2: Command Line
```bash
setup.bat
```

## Mac/Linux Users

### Option 1: Terminal
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Make it executable first, then run
```bash
bash setup.sh
```

---

## What These Scripts Do

✅ Check if Node.js is installed
✅ Install all dependencies (`npm install --legacy-peer-deps`)
✅ Create `.env.local` if it doesn't exist
✅ Add Groq API key automatically
✅ Start the development server (`npm run dev`)
✅ Open browser at http://localhost:3000

---

## 🎯 One-Command Setup

For **completely new computer**, just:

### Windows
```bash
setup.bat
```

### Mac/Linux
```bash
bash setup.sh
```

That's it! ✨

---

## Manual Setup (If Scripts Don't Work)

If scripts fail, run these commands manually:

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start server
npm run dev
```

---

## ⚙️ Prerequisites

**Must have installed:**
- **Node.js** v18+ (download from https://nodejs.org)

**Optional:**
- npm is included with Node.js
- Git (for cloning projects)

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Node.js not found" | Install from https://nodejs.org |
| "Permission denied" (Mac/Linux) | Run: `chmod +x setup.sh` first |
| "Port 3000 in use" | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| "Module not found" | Run script again or: `npm install` |
| ".bat file won't run" | Right-click → "Run as Administrator" |

---

## 📝 File Details

- **setup.bat** - For Windows (batch script)
- **setup.sh** - For Mac/Linux (shell script)
- **.env.local** - Created automatically with Groq API key

---

## Next Time

After first setup, just run:

```bash
npm run dev
```

No need to install again! 🎉
