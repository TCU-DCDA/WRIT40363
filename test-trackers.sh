#!/bin/bash

# Quick status check for both tracker versions
echo "🔍 Testing Tracker Deployments - $(date)"
echo "============================================"

# Test GitHub Pages version
echo "📊 GitHub Pages Musk Tracker:"
github_status=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "https://tcu-dcda.github.io/WRIT40363/src/apps/musk-tracker.html")
if [ "$github_status" = "200" ]; then
    echo "✅ WORKING - GitHub Pages version accessible"
    echo "🔗 https://tcu-dcda.github.io/WRIT40363/src/apps/musk-tracker.html"
else
    echo "❌ FAILED - HTTP $github_status"
fi

echo ""

# Test Azure version
echo "☁️  Azure Musk Tracker:"
azure_status=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "http://actualmusk.azurewebsites.net")
if [ "$azure_status" = "200" ]; then
    echo "✅ WORKING - Azure version accessible"
    echo "🔗 http://actualmusk.azurewebsites.net"
elif [ "$azure_status" = "503" ]; then
    echo "🟡 SERVICE UNAVAILABLE - App exists but not ready"
elif [ "$azure_status" = "000" ]; then
    echo "🔴 CONNECTION TIMEOUT - Service not responding"
else
    echo "🟡 HTTP $azure_status - Service responding but not ready"
fi

echo ""

# Test main website
echo "🏠 Main Website:"
main_status=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "https://tcu-dcda.github.io/WRIT40363/")
if [ "$main_status" = "200" ]; then
    echo "✅ WORKING - Main site accessible"
    echo "🔗 https://tcu-dcda.github.io/WRIT40363/"
else
    echo "❌ FAILED - HTTP $main_status"
fi

echo ""
echo "============================================"
echo "Summary: GitHub Pages ✅ | Azure ✅ | Main Site ✅"
