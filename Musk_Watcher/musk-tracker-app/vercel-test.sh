#!/bin/bash

echo "🔍 Vercel Deployment Diagnostics"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in app directory. Run from: Musk_Watcher/musk-tracker-app/"
    exit 1
fi

echo "✅ In correct directory"

# Check Node.js version
echo "📍 Node.js version: $(node --version)"

# Check if dependencies install correctly
echo "📦 Testing npm install..."
npm install --silent > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ npm install successful"
else
    echo "❌ npm install failed"
    npm install
    exit 1
fi

# Check if build works
echo "🔨 Testing build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    npm run build
    exit 1
fi

# Check if built files exist
if [ -f "dist/app.js" ]; then
    echo "✅ dist/app.js exists"
else
    echo "❌ dist/app.js missing"
    ls -la dist/
fi

# Check if entry point works
echo "🚀 Testing entry point..."
timeout 5s node dist/app.js > /dev/null 2>&1 &
sleep 2
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ App starts and responds"
    pkill -f "node dist/app.js"
else
    echo "⚠️  App may not respond immediately (normal for some apps)"
    pkill -f "node dist/app.js"
fi

echo ""
echo "🎯 Common Vercel Issues:"
echo "1. Build command not found → Set to 'npm run build'"
echo "2. Output directory wrong → Set to 'dist'"
echo "3. Start command issues → Should be 'node dist/app.js'"
echo "4. Missing dependencies → Check package.json"
echo ""
echo "✅ Diagnostic complete"
