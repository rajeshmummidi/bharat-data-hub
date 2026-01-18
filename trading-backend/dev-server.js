#!/usr/bin/env node

/**
 * Development Server Runner
 * Automatically restarts on file changes
 * Handles graceful shutdown
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 5000;
const WATCH_DIR = path.join(__dirname, 'trading-app');
const SERVER_FILE = path.join(__dirname, 'trading-app', 'server.js');

let serverProcess = null;
let isRestarting = false;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

function startServer() {
  if (isRestarting) {
    return;
  }

  log('Starting development server...', 'blue');
  
  serverProcess = spawn('node', [SERVER_FILE], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development', PORT },
  });

  serverProcess.on('error', (err) => {
    log(`Server error: ${err.message}`, 'red');
  });

  serverProcess.on('exit', (code) => {
    if (!isRestarting) {
      log(`Server exited with code ${code}`, 'yellow');
    }
  });

  log(`✓ Development server running on http://localhost:${PORT}`, 'green');
  log(`✓ Watching for changes in ${WATCH_DIR}...`, 'green');
}

function restartServer() {
  if (isRestarting) {
    return;
  }

  isRestarting = true;
  log('Restarting server due to file changes...', 'yellow');

  if (serverProcess) {
    serverProcess.kill();
  }

  setTimeout(() => {
    isRestarting = false;
    startServer();
  }, 500);
}

function watchFiles() {
  try {
    fs.watch(WATCH_DIR, { recursive: true }, (eventType, filename) => {
      // Ignore node_modules and system files
      if (filename && !filename.includes('node_modules') && !filename.startsWith('.')) {
        log(`File changed: ${filename}`, 'yellow');
        restartServer();
      }
    });
  } catch (err) {
    log(`Error setting up file watcher: ${err.message}`, 'red');
  }
}

// Start initial server
startServer();

// Watch for file changes
watchFiles();

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('Shutting down gracefully...', 'yellow');
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down...', 'yellow');
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(0);
});

// Handle process errors
process.on('error', (err) => {
  log(`Process error: ${err.message}`, 'red');
});
