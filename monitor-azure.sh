#!/bin/bash

# Azure App Service Monitoring Script
# Checks when the Musk Tracker app becomes available

AZURE_URL="https://actualmusk.azurewebsites.net"
GITHUB_PAGES_URL="https://tcu-dcda.github.io/WRIT40363/"
MAX_ATTEMPTS=60  # 10 minutes of checking
INTERVAL=10      # Check every 10 seconds

echo "🔍 Monitoring Azure App Service deployment..."
echo "Azure URL: $AZURE_URL"
echo "GitHub Pages: $GITHUB_PAGES_URL"
echo "Started at: $(date)"
echo "----------------------------------------"

attempt=1

while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo "Attempt $attempt/$MAX_ATTEMPTS - $(date +%H:%M:%S)"
    
    # Test Azure URL
    azure_status=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "$AZURE_URL" 2>/dev/null)
    
    if [ "$azure_status" = "200" ]; then
        echo "✅ SUCCESS! Azure App Service is ready!"
        echo "🌐 Musk Tracker available at: $AZURE_URL"
        
        # Test if the app actually loads content
        echo "🧪 Testing app functionality..."
        content_check=$(curl -s --connect-timeout 5 "$AZURE_URL" | grep -i "musk\|tracker\|dashboard" | head -1)
        
        if [ ! -z "$content_check" ]; then
            echo "✅ App content confirmed: $content_check"
        else
            echo "⚠️  App responds but content check unclear"
        fi
        
        # Test GitHub Pages integration
        echo "🔗 Testing GitHub Pages integration..."
        gh_pages_check=$(curl -s --connect-timeout 5 "$GITHUB_PAGES_URL" | grep -o "actualmusk\.azurewebsites\.net")
        
        if [ ! -z "$gh_pages_check" ]; then
            echo "✅ GitHub Pages correctly links to Azure URL"
        else
            echo "⚠️  GitHub Pages link may not be updated yet"
        fi
        
        echo ""
        echo "🎉 DEPLOYMENT COMPLETE! 🎉"
        echo "📊 Musk Tracker: $AZURE_URL"
        echo "🏠 Main Site: $GITHUB_PAGES_URL"
        break
        
    elif [ "$azure_status" = "503" ]; then
        echo "🟡 Service exists but not ready (503) - App may be starting..."
        
    elif [ "$azure_status" = "000" ]; then
        echo "🔴 Connection timeout/failed - Service not ready"
        
    else
        echo "🟡 HTTP $azure_status - Service responding but not ready"
    fi
    
    # Progress indicator
    printf "⏳ Waiting ${INTERVAL}s... "
    for i in $(seq 1 $INTERVAL); do
        printf "."
        sleep 1
    done
    echo ""
    
    attempt=$((attempt + 1))
done

if [ $attempt -gt $MAX_ATTEMPTS ]; then
    echo ""
    echo "❌ TIMEOUT: Azure service not ready after 10 minutes"
    echo "🔍 Check these resources:"
    echo "  • GitHub Actions: https://github.com/curtrode/WRIT40363/actions"
    echo "  • Azure Portal: https://portal.azure.com"
    echo "  • Manual test: curl -I $AZURE_URL"
fi
