---
title: Vercel | Deployment
---

Here's a translation of your markdown into English, including an explanation of why it might be useful to clear the data cache in Vercel's administration panel:

---

# Vercel | Deployment

## Introduction

This guide provides step-by-step instructions on how to deploy a Vite PWA on Vercel, including specific configurations for HTTP headers using a `vercel.json` file.

### Step 1: Prepare Your Vite PWA

Ensure your application is deployment-ready. This includes having all necessary dependencies listed in your `package.json` and ensuring your application compiles without errors.

### Step 2: Create the `vercel.json` File

Create a `vercel.json` file at the root of your project to manage HTTP headers and redirects. This configuration mirrors some settings you might use with Netlify but adapted for Vercel's platform.

```json
{
  "headers": [
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/manifest.webmanifest",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 3: Set Up Your Project on Vercel

1. **Log into Vercel**: Create an account or log in at [Vercel](https://vercel.com).
2. **Deploy Your Project**: Click on **New Project**, then select the Git repository where your Vite PWA is located.
3. **Configure the Deployment**: Vercel will automatically detect that it's a Vite project and suggest default configurations. Adjust these settings as needed.
4. **Deploy**: After verifying the configuration, click on **Deploy** to start the deployment process.

### Step 4: Verify the Deployment

Once deployment is complete, Vercel will provide a URL to access your deployed application. Check that everything works as expected, especially that the HTTP headers are applied correctly by inspecting the server responses using your browser's developer tools.

### Clearing the Data Cache in Vercel's Administration

It might be useful to clear the data cache in Vercel's administration panel, especially if you are experiencing issues with stale content or deployment errors that seem unrelated to your current build. Clearing the cache ensures that all previous build settings, dependencies, and stored data are removed, allowing a fresh start for a new deployment. This can help in resolving unexpected behavior and improving the reliability of deployment processes.
