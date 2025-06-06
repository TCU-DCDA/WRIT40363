#!/bin/bash

# Azure Deployment Diagnostic Script
echo "🔍 Azure Deployment Diagnostics - $(date)"
echo "============================================"

# Test different endpoints
AZURE_URL="http://actualmusk.azurewebsites.net"

echo "📋 Testing Azure App Service endpoints:"
echo ""

# Test root
echo "1. Root endpoint:"
curl -v --connect-timeout 10 "$AZURE_URL" 2>&1 | grep -E "(HTTP|connect|timeout|SSL|certificate)"

echo ""
echo "2. Health check (if available):"
curl -v --connect-timeout 10 "$AZURE_URL/health" 2>&1 | grep -E "(HTTP|connect|timeout)"

echo ""
echo "3. API endpoint test:"
curl -v --connect-timeout 10 "$AZURE_URL/api/websites" 2>&1 | grep -E "(HTTP|connect|timeout)"

echo ""
echo "4. DNS Resolution test:"
nslookup actualmusk.azurewebsites.net

echo ""
echo "5. Network connectivity test:"
ping -c 3 actualmusk.azurewebsites.net

echo ""
echo "============================================"
echo "🔗 Check these resources:"
echo "  • GitHub Actions: https://github.com/TCU-DCDA/WRIT40363/actions"
echo "  • Azure Portal: https://portal.azure.com"
echo "  • App Service URL: $AZURE_URL"
