# Development Server Auto-Restart Setup Guide

## 🎯 Overview

Your trading platform is now configured to **automatically restart the server** whenever you make changes to files. This ensures the site is always up-to-date with your latest modifications.

---

## ⚡ Quick Start (Pick One Method)

### Method 1: Using Nodemon (Recommended)

**Best for: Production-like development environment**

```bash
cd d:\VS Code\trading site\trading-backend
npm run dev
```

**What it does:**
- ✅ Automatically restarts on file changes
- ✅ Watches: `trading-app/` directory
- ✅ File extensions: `.js`, `.html`, `.css`
- ✅ 500ms delay before restart (prevents duplicate restarts)
- ✅ Runs on http://localhost:5000

### Method 2: Using Custom Dev Server

**Best for: Advanced control and logging**

```bash
cd d:\VS Code\trading site\trading-backend
npm run dev:custom
```

**What it does:**
- ✅ Built-in file watcher
- ✅ Colored console output
- ✅ Detailed logging
- ✅ Graceful shutdown
- ✅ Runs on http://localhost:5000

### Method 3: Using Watch Alias

**Best for: Quick typing**

```bash
cd d:\VS Code\trading site\trading-backend
npm run watch
```

**What it does:**
- ✅ Same as Method 1 (nodemon)
- ✅ Shorter command name

---

## 📁 What Gets Watched

### Automatically Restarts When Changed:
```
✅ trading-app/server.js       (Server logic)
✅ trading-app/frontend/*.js   (Frontend scripts)
✅ trading-app/frontend/*.html (HTML pages)
✅ trading-app/frontend/*.css  (Styles)
✅ trading-app/*.js            (Any JS in root)
```

### Ignored (Won't Trigger Restart):
```
❌ node_modules/               (Dependencies)
❌ .git/                        (Version control)
❌ .gitignore                   (Config files)
❌ *.md                         (Documentation)
❌ .env                         (Local config)
```

---

## 🔄 How Auto-Restart Works

### Workflow:
```
1. You make changes to a file (e.g., script.js)
   ↓
2. File system detects the change
   ↓
3. Nodemon/Watcher waits 500ms (debounce)
   ↓
4. Server process is killed gracefully
   ↓
5. Server restarts immediately
   ↓
6. Changes are live on http://localhost:5000
   ↓
7. Refresh browser to see updates
```

### Restart Events:
```
✓ File modified    → Restart
✓ File created     → Restart
✓ File deleted     → Restart
✓ Directory change → Restart
```

---

## 🖥️ Terminal Commands

### Start Development Server
```powershell
npm run dev
```

### Stop Server
```powershell
Press Ctrl+C in terminal
```

### Manually Restart (While Running)
```powershell
Type 'rs' and press Enter in terminal
```

### View Server Logs
```
Server logs automatically print to terminal
Look for timestamps and messages
Green = Success
Yellow = Warning
Red = Error
```

---

## 📊 Configuration Files

### nodemon.json
Controls auto-restart behavior:
```json
{
  "watch": ["trading-app"],           // Directories to watch
  "ext": "js,html,css,json",          // File extensions
  "delay": 500,                       // Milliseconds before restart
  "ignore": ["node_modules", ".git"], // Don't watch these
  "verbose": true                     // Show detailed output
}
```

### .env
Development environment settings:
```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment type
WATCH_DELAY=500             # Auto-restart delay
LOG_LEVEL=debug             # Logging verbosity
```

### package.json
NPM scripts for development:
```json
"scripts": {
  "dev": "nodemon --watch trading-app --ext js,html,css",
  "watch": "nodemon --watch trading-app --ext js,html,css",
  "dev:custom": "node dev-server.js"
}
```

---

## ✨ Features & Benefits

### Auto-Restart Benefits
- ✅ **No Manual Server Restart** - Changes apply automatically
- ✅ **Real-Time Development** - Instant feedback
- ✅ **Time Saving** - No context switching
- ✅ **Error Detection** - Sees crashes immediately
- ✅ **Persistent Connection** - Client state maintained

### Debouncing (500ms Delay)
- ✅ Prevents multiple restarts for same change
- ✅ Waits for all file writes to complete
- ✅ Reduces unnecessary restarts
- ✅ Improves performance

### Error Handling
- ✅ Server crashes display in terminal
- ✅ Auto-recovery on syntax fixes
- ✅ Graceful shutdown on errors
- ✅ Restart on recovery

---

## 🐛 Troubleshooting

### Problem: Server Not Starting
```
Error: Port 5000 already in use

Solution:
1. Open PowerShell as Administrator
2. Run: netstat -ano | findstr :5000
3. Find the PID (Process ID)
4. Run: taskkill /PID <PID> /F
5. Retry: npm run dev
```

### Problem: File Changes Not Triggering Restart
```
Check:
1. File is in 'trading-app' directory
2. Extension is .js, .html, or .css
3. File is not in node_modules
4. Nodemon is running (check terminal)

Solution:
1. Manually restart: Press Ctrl+C
2. Run: npm run dev again
```

### Problem: Server Keeps Restarting Loop
```
Cause: Infinite loop in code or syntax error

Solution:
1. Check terminal for error messages (RED text)
2. Fix the error in your code
3. Server will auto-restart once fixed
```

### Problem: Changes Not Showing in Browser
```
Solution:
1. Server restarted ✓ (check terminal)
2. Refresh browser (F5 or Ctrl+R)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh (Ctrl+Shift+R)
```

### Problem: Port Already in Use
```
Solution 1 (Kill existing process):
netstat -ano | findstr :5000
taskkill /PID <PID> /F
npm run dev

Solution 2 (Use different port):
set PORT=5001 && npm run dev
```

---

## 🚀 Development Workflow

### Typical Development Session

```
1. Terminal 1 - Start Dev Server
   $ npm run dev
   ✓ Server running on http://localhost:5000
   ✓ Watching for changes...

2. Editor - Make Changes
   - Edit: trading-app/frontend/script.js
   - Edit: trading-app/frontend/styles.css
   - Edit: trading-app/server.js

3. Terminal 1 - Auto-Restart
   ✓ File changed: script.js
   ✓ Restarting server...
   ✓ Server running on http://localhost:5000

4. Browser - Refresh & Test
   - F5 to refresh
   - See changes live
   - No manual restart needed!
```

---

## 📱 Browser Auto-Reload (Optional)

For **automatic browser refresh** when server restarts:

### Option 1: VS Code Live Server
1. Install: "Live Server" extension
2. Right-click HTML file
3. Select "Open with Live Server"
4. Automatically refreshes on changes

### Option 2: Browser Plugins
- **Live.js** - Auto-reload on file changes
- **LiveReload** - Auto-reload with browser extension
- **Reload** - Simple auto-reload extension

### Option 3: Manual Refresh
- Press F5 after each change
- Takes 1-2 seconds

---

## 📊 Performance Optimization

### Tips for Faster Restarts

1. **Keep Files Organized**
   ```
   ✓ Related files in same directory
   ✓ Clear naming conventions
   ✓ Separate concerns
   ```

2. **Use Efficient Code**
   ```
   ✓ Avoid infinite loops
   ✓ Prevent long computations
   ✓ Use async/await properly
   ```

3. **Monitor Server Load**
   ```
   ✓ Check CPU usage
   ✓ Monitor memory usage
   ✓ Watch network requests
   ```

4. **Restart Timing**
   ```
   ✓ 500ms is optimal
   ✓ Prevents double restarts
   ✓ Fast enough for testing
   ```

---

## 🔧 Advanced Configuration

### Customize Restart Behavior

Edit `nodemon.json`:

```json
{
  "watch": ["trading-app", "config"],     // Add more directories
  "ignore": ["*.test.js", "*.log"],       // Ignore specific files
  "ext": "js,html,css,json",              // Add more extensions
  "delay": 1000,                          // Increase delay if needed
  "restartable": "rs",                    // Manual restart command
  "verbose": true,                        // Detailed logging
  "legacyWatch": false,                   // Use modern file watching
  "runOnChangeOnly": false                // Always run on startup
}
```

### Custom Restart Script

Add to `package.json`:

```json
"scripts": {
  "dev": "nodemon --exec 'npm run start:server'",
  "start:server": "clear && node trading-app/server.js"
}
```

---

## 🎓 What Changed

### Files Added/Modified:

1. **nodemon.json** (NEW)
   - Auto-restart configuration
   - File watching settings
   - Restart behavior

2. **dev-server.js** (NEW)
   - Custom development server
   - Built-in file watcher
   - Colored logging

3. **.env** (NEW)
   - Environment configuration
   - Development settings
   - Feature flags

4. **package.json** (MODIFIED)
   - Added `npm run dev` script
   - Added `npm run watch` script
   - Added `npm run dev:custom` script
   - Added nodemon devDependency

---

## ✅ Verification Checklist

### Before Using:
- [ ] Nodemon installed: `npm list nodemon`
- [ ] package.json has dev scripts
- [ ] nodemon.json exists
- [ ] .env file created
- [ ] Port 5000 is available

### After Starting:
- [ ] Server starts without errors
- [ ] Terminal shows "Server running on http://localhost:5000"
- [ ] Browser loads http://localhost:5000
- [ ] Page displays correctly

### Test Auto-Restart:
- [ ] Make a change to `script.js`
- [ ] Terminal shows file change notification
- [ ] Terminal shows server restart
- [ ] Browser refresh shows changes

---

## 🎉 You're All Set!

Your development server is now configured for **automatic restarts**. 

### Next Steps:
1. Start dev server: `npm run dev`
2. Make changes to your code
3. Server restarts automatically
4. Refresh browser to see changes
5. Keep coding with zero manual restarts!

---

## 📞 Support

### Common Issues Quick Fix:

| Issue | Solution |
|-------|----------|
| Port in use | `taskkill /PID <PID> /F` then retry |
| Changes not showing | Press F5 to refresh browser |
| Server won't start | Check `npm install` completed |
| Stuck in restart loop | Check for syntax errors in code |
| Nodemon not found | Run `npm install nodemon --save-dev` |

---

## 🚀 Summary

**Your platform now has:**
✅ Automatic server restart on file changes
✅ Zero manual configuration needed
✅ Production-ready development setup
✅ Fast iteration workflow
✅ Real-time feedback

**Start Development Now:**
```bash
cd d:\VS Code\trading site\trading-backend
npm run dev
```

**Happy coding!** 🎉
