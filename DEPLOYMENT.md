# Deployment Guide

This project uses a hybrid deployment strategy:
- **Main Course Website**: Deployed to GitHub Pages (static hosting)
- **Musk Tracker App**: Deployed to Azure App Service (server hosting)

## GitHub Pages Deployment

### Prerequisites
1. GitHub repository with your code
2. GitHub Pages enabled in repository settings

### Setup
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow in `.github/workflows/deploy-pages.yml` will automatically deploy your `src/` folder

### URL
Your site will be available at: `https://[username].github.io/[repository-name]`

## Azure Deployment

### Prerequisites
1. Azure account
2. Azure App Service created
3. GitHub repository secrets configured

### Setup Azure App Service
1. Create a new App Service in Azure Portal
2. Choose Node.js runtime
3. Download the publish profile
4. Add the following secrets to your GitHub repository:
   - `AZURE_WEBAPP_NAME`: Your app service name
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: Content of the publish profile

### Environment Variables (Azure)
Set these in your Azure App Service configuration:
- `NODE_ENV`: production
- `PORT`: (automatically set by Azure)

### Manual Deployment (Alternative)
If you prefer manual deployment to Azure:

```bash
# Navigate to the Musk tracker directory
cd Musk_Watcher/musk-tracker-app

# Install dependencies
npm install

# Build the application
npm run build

# Deploy using Azure CLI (if installed)
az webapp up --name your-app-name --resource-group your-resource-group
```

## Integration

The main website includes a link to the Musk tracker app. Update the URL in `src/scripts/main.js`:

```javascript
const MUSK_TRACKER_URL = 'https://your-actual-azure-url.azurewebsites.net';
```

## Monitoring

- **GitHub Pages**: Check the Actions tab for deployment status
- **Azure**: Monitor through Azure Portal's App Service logs

## Costs

- **GitHub Pages**: Free for public repositories
- **Azure App Service**: Varies by plan (Free tier available with limitations)

## Security Considerations

1. Keep sensitive data in environment variables
2. Use HTTPS for both deployments
3. Consider CORS settings for cross-origin requests
4. Regularly update dependencies

## Troubleshooting

### GitHub Pages Issues
- Check Actions tab for build errors
- Ensure `src/` folder contains valid HTML/CSS/JS
- Verify repository is public or has GitHub Pages enabled

### Azure Issues
- Check Application Insights or logs in Azure Portal
- Verify Node.js version compatibility
- Ensure all dependencies are in package.json
- Check environment variables are set correctly
