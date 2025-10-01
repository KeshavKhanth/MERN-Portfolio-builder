# MERN Portfolio Builder - Heroku Deployment Guide

## Required Environment Variables

Your app requires the following environment variables to be set in Heroku:

### Core Environment Variables
```bash
NODE_ENV=production
PORT=5000  # Heroku sets this automatically, but good to have as fallback
```

### Database Configuration
```bash
MONGODB_URI=your_mongodb_connection_string
# Example: mongodb+srv://username:password@cluster.mongodb.net/portfolio_builder?retryWrites=true&w=majority
```

### JWT Configuration
```bash
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_key_min_32_chars
JWT_REFRESH_EXPIRE=30d
```

### Email Configuration (Optional - for password reset, etc.)
```bash
EMAIL_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend Configuration
```bash
CLIENT_URL=https://your-app-name.herokuapp.com
```

## Step-by-Step Deployment Instructions

### 1. Set Heroku Config Variables

Run these commands in your terminal (replace with your actual values):

```bash
# Core environment
heroku config:set NODE_ENV=production --app your-app-name

# Database
heroku config:set MONGODB_URI="your_mongodb_connection_string" --app your-app-name

# JWT secrets (generate strong secrets)
heroku config:set JWT_SECRET="your_super_secure_jwt_secret_key_min_32_chars" --app your-app-name
heroku config:set JWT_EXPIRE=7d --app your-app-name
heroku config:set JWT_REFRESH_SECRET="your_super_secure_refresh_secret_key_min_32_chars" --app your-app-name
heroku config:set JWT_REFRESH_EXPIRE=30d --app your-app-name

# Client URL (replace with your actual Heroku app URL)
heroku config:set CLIENT_URL="https://your-app-name.herokuapp.com" --app your-app-name

# Email (optional - only if you want email functionality)
heroku config:set EMAIL_ENABLED=true --app your-app-name
heroku config:set EMAIL_HOST=smtp.gmail.com --app your-app-name
heroku config:set EMAIL_PORT=587 --app your-app-name
heroku config:set EMAIL_USER="your_email@gmail.com" --app your-app-name
heroku config:set EMAIL_PASS="your_app_password" --app your-app-name
```

### 2. Generate Secure JWT Secrets

You can generate secure secrets using Node.js:

```javascript
// Run this in Node.js console or create a temp file
console.log('JWT_SECRET:', require('crypto').randomBytes(64).toString('hex'));
console.log('JWT_REFRESH_SECRET:', require('crypto').randomBytes(64).toString('hex'));
```

### 3. Set Up MongoDB Atlas (if not already done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Whitelist Heroku's IP addresses (or use 0.0.0.0/0 for all IPs)

### 4. Verify Config Variables

Check that all variables are set:
```bash
heroku config --app your-app-name
```

### 5. Deploy the Updated Code

```bash
git add .
git commit -m "Fix server configuration for production deployment"
git push heroku main
```

### 6. Check Deployment Logs

```bash
heroku logs --tail --app your-app-name
```

## Troubleshooting

### Common Issues:

1. **App crashes immediately**: Check logs for missing environment variables
2. **Database connection fails**: Verify MONGODB_URI is correct and MongoDB Atlas is configured
3. **Frontend not loading**: Ensure NODE_ENV=production is set
4. **API calls failing**: Check CLIENT_URL matches your Heroku app URL

### Health Check

Once deployed, test these endpoints:
- `https://your-app-name.herokuapp.com/health` - Should return server status
- `https://your-app-name.herokuapp.com/` - Should load React frontend
- `https://your-app-name.herokuapp.com/api/templates` - Should return templates (if any)

## Your Current App URL

Based on the deployment log, your app is deployed at:
https://portfolio-mern-stack-92314c8ea52e.herokuapp.com/

Make sure to set CLIENT_URL to this exact URL.