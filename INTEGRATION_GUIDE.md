# Frontend-Backend Integration Guide

## Overview

This guide explains how the TS SHIVA JI ENTERPRISES frontend is connected to the backend API.

## Architecture

```
src/
├── api/                    # API layer
│   ├── client.js          # Base API client with auth
│   ├── enquiries.js       # Enquiry endpoints
│   ├── callbacks.js       # Callback endpoints
│   ├── projects.js        # Projects endpoints
│   ├── gallery.js         # Gallery endpoints
│   ├── settings.js        # Settings endpoints
│   ├── admin.js           # Admin auth endpoints
│   └── index.js           # Exports all APIs
├── hooks/                  # React hooks
│   ├── useProjects.js     # Fetch projects
│   ├── useGallery.js      # Fetch gallery
│   └── useSettings.js     # Fetch settings
└── components/             # Updated components
    ├── Contact.jsx        # Connected to backend
    ├── Projects.jsx       # Dynamic from API
    ├── Gallery.jsx        # Dynamic from API
    └── WhatsAppButton.jsx # Uses settings API
```

## Setup Instructions

### 1. Install Dependencies

No new dependencies needed! The integration uses native `fetch` API.

### 2. Environment Variables

Create `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Start Frontend

```bash
# In root directory
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features Implemented

### ✅ Contact Form
- Submits to `POST /api/enquiries`
- Loading state with spinner
- Success message with checkmark
- Error handling with friendly messages
- Form resets after successful submission
- No more mailto links

### ✅ Projects Section
- Fetches from `GET /api/projects/featured`
- Shows loading spinner while fetching
- Falls back to static content if API fails
- Displays project images from Cloudinary
- Maintains original premium design

### ✅ Gallery Section
- Fetches from `GET /api/gallery`
- Shows loading spinner while fetching
- Falls back to static content if API fails
- Displays gallery images from Cloudinary
- Maintains original card design

### ✅ WhatsApp Button
- Uses phone number from `GET /api/settings/public`
- Falls back to default if API unavailable
- Dynamic company name in message

### ✅ Site Settings
- Contact info pulled from settings API
- Company phone, email, address
- WhatsApp number
- All with fallback values

## API Client Features

### Authentication
```javascript
import { adminApi } from './api';

// Login
const { token, user } = await adminApi.login(email, password);

// Check if authenticated
const isLoggedIn = adminApi.isAuthenticated();

// Logout
adminApi.logout();
```

### Error Handling
All API calls return structured errors:
```javascript
{
  status: 400,
  message: "Validation failed",
  details: [{ field: "email", message: "Invalid email" }]
}
```

### File Uploads
```javascript
import { projectsApi } from './api';

const formData = {
  title: "New Project",
  category: "Residential",
  shortDescription: "...",
  fullDescription: "...",
  coverImage: fileObject, // File from input
};

await projectsApi.create(formData);
```

## React Hooks Usage

### useProjects
```javascript
import { useProjects } from './hooks/useProjects';

function MyComponent() {
  const { projects, loading, error } = useProjects(true); // true = featured only
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return <ProjectList projects={projects} />;
}
```

### useGallery
```javascript
import { useGallery } from './hooks/useGallery';

function MyComponent() {
  const { items, loading, error } = useGallery();
  
  return <GalleryGrid items={items} />;
}
```

### useSettings
```javascript
import { useSettings } from './hooks/useSettings';

function MyComponent() {
  const { settings, loading, error } = useSettings();
  
  return <div>{settings.company_name}</div>;
}
```

## Admin API Functions

All admin functions are ready to use:

```javascript
import { enquiriesApi, projectsApi, galleryApi, settingsApi } from './api';

// Enquiries
const enquiries = await enquiriesApi.getAll({ status: 'new', page: 1 });
await enquiriesApi.updateStatus(id, 'contacted');

// Projects
await projectsApi.create(formData);
await projectsApi.update(id, formData);
await projectsApi.delete(id);

// Gallery
await galleryApi.create(formData);
await galleryApi.update(id, formData);
await galleryApi.delete(id);

// Settings
const settings = await settingsApi.getAll();
await settingsApi.update([
  { settingKey: 'company_phone', settingValue: '+91 1234567890' }
]);
```

## Testing the Integration

### 1. Test Contact Form
1. Fill out the contact form
2. Click Submit
3. Should see loading spinner
4. Should see success message
5. Form should reset
6. Check backend logs for enquiry

### 2. Test Projects
1. Open browser console
2. Check for API call to `/api/projects/featured`
3. Projects should load dynamically
4. If backend is down, static content shows

### 3. Test Gallery
1. Open browser console
2. Check for API call to `/api/gallery`
3. Gallery items should load dynamically
4. If backend is down, static content shows

### 4. Test Settings
1. Open browser console
2. Check for API call to `/api/settings/public`
3. Contact info should use API values
4. WhatsApp button should use API phone number

## Fallback Strategy

The integration is designed to be resilient:

- **Projects**: Falls back to 4 static project cards
- **Gallery**: Falls back to 6 static gallery items
- **Settings**: Falls back to hardcoded values
- **Contact Form**: Shows error message if submission fails

This ensures the website always works, even if the backend is temporarily unavailable.

## CORS Configuration

Make sure your backend `.env` has:
```
FRONTEND_URL=http://localhost:5173
```

The backend is already configured to accept requests from this origin.

## Production Deployment

### Frontend
1. Update `.env` with production API URL:
   ```
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```
2. Build: `npm run build`
3. Deploy `dist` folder to hosting

### Backend
1. Update backend `.env` with production values
2. Set `FRONTEND_URL` to your production domain
3. Deploy backend to server
4. Run migrations: `npm run prisma:migrate`
5. Seed database: `npm run prisma:seed`

## Troubleshooting

### Contact form not submitting
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is correct
- Check backend is running
- Check CORS settings

### Projects/Gallery not loading
- Check browser console for API errors
- Verify backend endpoints are working
- Check if fallback content is showing

### WhatsApp button not working
- Check settings API response
- Verify phone number format in database
- Check browser console for errors

## Next Steps

To build an admin dashboard:
1. Create admin login page
2. Use `adminApi.login()` for authentication
3. Create admin routes with authentication check
4. Use admin API functions to manage content
5. Build forms for creating/editing projects and gallery

The API layer is complete and ready for admin UI development!
