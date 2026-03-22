# System Architecture

## Overview

TS SHIVA JI ENTERPRISES is a full-stack web application with a React frontend and Node.js backend.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Vite)                  │
│                     http://localhost:5173                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Components  │  │    Hooks     │  │   API Layer  │          │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤          │
│  │ Contact.jsx  │  │ useProjects  │  │  client.js   │          │
│  │ Projects.jsx │  │ useGallery   │  │ enquiries.js │          │
│  │ Gallery.jsx  │  │ useSettings  │  │ projects.js  │          │
│  │ WhatsApp.jsx │  │              │  │ gallery.js   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                 │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                    HTTP/REST API
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                            ▼                                      │
│                  BACKEND (Node.js + Express)                      │
│                     http://localhost:5000                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Routes    │  │ Controllers  │  │   Services   │          │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤          │
│  │ publicRoutes │  │   enquiry    │  │    email     │          │
│  │ adminRoutes  │  │   project    │  │   upload     │          │
│  │              │  │   gallery    │  │              │          │
│  │              │  │   settings   │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                 │
│                            │                                     │
│  ┌──────────────┐          │          ┌──────────────┐          │
│  │  Middleware  │          │          │    Config    │          │
│  ├──────────────┤          │          ├──────────────┤          │
│  │     auth     │          │          │   database   │          │
│  │  validation  │          │          │     email    │          │
│  │ rateLimiter  │          │          │  cloudinary  │          │
│  │errorHandler  │          │          │              │          │
│  └──────────────┘          │          └──────────────┘          │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                      Prisma ORM
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                            ▼                                      │
│                   DATABASE (PostgreSQL)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  AdminUser   │  │   Enquiry    │  │   Project    │          │
│  │  Callback    │  │ GalleryItem  │  │ SiteSetting  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Cloudinary  │  │   Nodemailer │  │ Google Maps  │          │
│  │ (Images CDN) │  │    (Email)   │  │    (Maps)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Contact Form Submission

```
User fills form
    ↓
Contact.jsx component
    ↓
enquiriesApi.create()
    ↓
POST /api/enquiries
    ↓
enquiryController.createEnquiry()
    ↓
Prisma saves to database
    ↓
emailService.sendEnquiryNotification()
    ↓
Nodemailer sends email
    ↓
Success response to frontend
    ↓
Success message displayed
```

### 2. Projects Display

```
Projects.jsx mounts
    ↓
useProjects() hook
    ↓
projectsApi.getFeatured()
    ↓
GET /api/projects/featured
    ↓
projectController.getFeaturedProjects()
    ↓
Prisma queries database
    ↓
Projects data returned
    ↓
Projects rendered with images from Cloudinary
```

### 3. Admin Authentication

```
Admin enters credentials
    ↓
adminApi.login()
    ↓
POST /api/admin/login
    ↓
authController.login()
    ↓
bcrypt verifies password
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Token sent with subsequent requests
    ↓
authenticate middleware validates token
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Native Fetch API
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **File Upload**: Multer
- **Email**: Nodemailer
- **Image Storage**: Cloudinary

### Database Schema

```
AdminUser
├── id (UUID)
├── name
├── email (unique)
├── passwordHash
├── role
├── isActive
├── createdAt
└── updatedAt

Enquiry
├── id (UUID)
├── name
├── phone
├── email
├── serviceInterest
├── message
├── status (new/contacted/closed)
├── source (website)
├── createdAt
└── updatedAt

CallbackRequest
├── id (UUID)
├── name
├── phone
├── preferredTime
├── notes
├── status (pending/completed)
├── createdAt
└── updatedAt

Project
├── id (UUID)
├── title
├── slug (unique)
├── category
├── shortDescription
├── fullDescription
├── location
├── coverImageUrl
├── isFeatured
├── displayOrder
├── createdAt
└── updatedAt

GalleryItem
├── id (UUID)
├── title
├── imageUrl
├── projectId (FK → Project)
├── displayOrder
├── isActive
├── createdAt
└── updatedAt

SiteSetting
├── id (UUID)
├── settingKey (unique)
├── settingValue
├── createdAt
└── updatedAt
```

## API Endpoints

### Public Endpoints (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiries` | Submit contact form |
| POST | `/api/callback-requests` | Request callback |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/featured` | Get featured projects |
| GET | `/api/projects/:slug` | Get project by slug |
| GET | `/api/gallery` | Get gallery items |
| GET | `/api/settings/public` | Get public settings |

### Admin Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/me` | Get current admin |
| GET | `/api/admin/enquiries` | List enquiries |
| PATCH | `/api/admin/enquiries/:id` | Update enquiry |
| GET | `/api/admin/callbacks` | List callbacks |
| PATCH | `/api/admin/callbacks/:id` | Update callback |
| POST | `/api/admin/projects` | Create project |
| PATCH | `/api/admin/projects/:id` | Update project |
| DELETE | `/api/admin/projects/:id` | Delete project |
| POST | `/api/admin/gallery` | Upload gallery item |
| PATCH | `/api/admin/gallery/:id` | Update gallery item |
| DELETE | `/api/admin/gallery/:id` | Delete gallery item |
| GET | `/api/admin/settings` | Get all settings |
| PATCH | `/api/admin/settings` | Update settings |

## Security Features

### Authentication & Authorization
- JWT tokens with expiration
- bcrypt password hashing (10 rounds)
- Token stored in localStorage
- Protected admin routes

### Input Validation
- Zod schema validation
- Type checking
- Required field validation
- Email format validation

### Rate Limiting
- General: 100 requests per 15 minutes
- Auth: 5 attempts per 15 minutes
- Enquiries: 5 submissions per hour

### CORS
- Configured allowed origins
- Credentials support
- Preflight handling

### Error Handling
- Centralized error middleware
- Structured error responses
- No sensitive data in errors
- Development vs production modes

## File Upload Flow

```
User selects image
    ↓
Frontend FormData
    ↓
Multer middleware (memory storage)
    ↓
uploadService.uploadToCloudinary()
    ↓
Image uploaded to Cloudinary
    ↓
Cloudinary returns secure_url
    ↓
URL saved to database
    ↓
Image served from Cloudinary CDN
```

## Environment Configuration

### Frontend (.env)
```
VITE_API_BASE_URL → API base URL
VITE_GOOGLE_MAPS_API_KEY → Maps API key
```

### Backend (backend/.env)
```
NODE_ENV → Environment mode
PORT → Server port
DATABASE_URL → PostgreSQL connection
JWT_SECRET → Token signing key
JWT_EXPIRES_IN → Token expiration
CLOUDINARY_* → Image upload credentials
EMAIL_* → Email service credentials
FRONTEND_URL → CORS origin
```

## Deployment Architecture

### Production Setup

```
┌─────────────────┐
│   Cloudflare    │ ← CDN & DNS
└────────┬────────┘
         │
┌────────▼────────┐
│  Vercel/Netlify │ ← Frontend (Static)
└────────┬────────┘
         │
         │ HTTPS
         │
┌────────▼────────┐
│ Railway/Render  │ ← Backend (Node.js)
└────────┬────────┘
         │
┌────────▼────────┐
│   PostgreSQL    │ ← Database (Managed)
└─────────────────┘

┌─────────────────┐
│   Cloudinary    │ ← Image CDN
└─────────────────┘
```

## Performance Optimizations

### Frontend
- Code splitting with Vite
- Lazy loading components
- Image optimization
- Framer Motion animations
- Tailwind CSS purging

### Backend
- Database connection pooling
- Prisma query optimization
- Response caching headers
- Cloudinary image transformations
- Rate limiting

### Database
- Indexed fields (email, slug, settingKey)
- Efficient queries with Prisma
- Connection pooling
- Proper foreign keys

## Monitoring & Logging

### Frontend
- Browser console errors
- Network request monitoring
- Performance metrics

### Backend
- Request/response logging
- Error logging
- Database query logging (dev)
- Email delivery status

## Scalability Considerations

### Horizontal Scaling
- Stateless backend (JWT)
- Database connection pooling
- CDN for static assets
- Load balancer ready

### Vertical Scaling
- Efficient database queries
- Optimized image delivery
- Minimal dependencies
- Clean architecture

## Future Enhancements

- [ ] Admin dashboard UI
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Progressive Web App
- [ ] Advanced search
- [ ] Project filtering
- [ ] Gallery lightbox
- [ ] SEO optimization
- [ ] Sitemap generation

---

This architecture provides a solid foundation for a production-ready construction company website with room for growth and enhancement.
