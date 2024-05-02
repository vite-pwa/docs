---
title: Vercel | Deployment
---

# Vercel

## Instructions

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

### (Optional) Clearing the Data Cache in Vercel's Administration

It might be useful to clear the data cache in Vercel's administration panel, especially if you are experiencing issues with stale content or deployment errors that seem unrelated to your current build. Clearing the cache ensures that all previous build settings, dependencies, and stored data are removed, allowing a fresh start for a new deployment. This can help in resolving unexpected behavior and improving the reliability of deployment processes.

Here is an explanation of the `vercel.json` configuration file, suitable for adding to your documentation:

## Understanding the `vercel.json` Configuration for Vercel Deployment

The `vercel.json` file is a crucial component for configuring deployments on Vercel. It allows you to customize how Vercel serves your application, including how it handles HTTP headers, redirects, rewrites, caching, and more. This file should be placed in the root directory of your project.

Vercel docs : [https://vercel.com/docs/projects/project-configuration](https://vercel.com/docs/projects/project-configuration)

Below is a detailed explanation of each part of the `vercel.json` file provided in the setup instructions:

### HTTP Headers Configuration

The `headers` section of the `vercel.json` file allows you to specify HTTP response headers that should be added to responses serving files from specified paths:

- **HTML Files**:

  ```json
  {
    "source": "/(.*).html",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      }
    ]
  }
  ```

  This rule applies a `Cache-Control` header to all HTML files, indicating that they should not be cached (`max-age=0`) and must be revalidated with the server on each request.

- **Service Worker**:

  ```json
  {
    "source": "/sw.js",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      }
    ]
  }
  ```

  Similar to HTML files, the service worker is set to no caching and must be checked for updates frequently to ensure it is up-to-date.

- **Web Manifest**:

  ```json
  {
    "source": "/manifest.webmanifest",
    "headers": [
      {
        "key": "Content-Type",
        "value": "application/manifest+json"
      }
    ]
  }
  ```

  Ensures that the manifest file has the correct `Content-Type` header to be properly recognized by browsers.

- **Assets**:

  ```json
  {
    "source": "/assets/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "max-age=31536000, immutable"
      }
    ]
  }
  ```

  Caches assets like images, scripts, and stylesheets aggressively, using a long `max-age` to improve loading times for returning visitors.

- **Security Headers**:
  ```json
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
  ```
  These headers enhance security by preventing sniffing attacks, framing your site from another site, and activating browser mechanisms to block reflected XSS attacks.

### Redirects and Rewrites

- **Rewrites**:
  ```json
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
  ```
  This rewrite rule is essential for single-page applications (SPAs). It directs any request to any path back to your `index.html`, allowing the front-end routing in your SPA to handle the path.
