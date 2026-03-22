# 📁 Complete File Structure

Visual representation of the entire project structure.

```
ts-shivaji-enterprises/
│
├── 📂 backend/                              # Backend Application
│   ├── 📂 src/
│   │   ├── 📂 config/                      # Configuration files
│   │   │   ├── 📄 database.js              # Prisma client setup
│   │   │   ├── 📄 email.js                 # Nodemailer configuration
│   │   │   └── 📄 cloudinary.js            # Cloudinary setup
│   │   │
│   │   ├── 📂 controllers/                 # Request handlers
│   │   │   ├── 📄 authController.js        # Login, getMe
│   │   │   ├── 📄 enquiryController.js     # Create, getAll, update
│   │   │   ├── 📄 callbackController.js    # Create, getAll, update
│   │   │   ├── 📄 projectController.js     # CRUD operations
│   │   │   ├── 📄 galleryController.js     # CRUD operations
│   │   │   └── 📄 settingsController.js    # Get, update settings
│   │   │
│   │   ├── 📂 middleware/                  # Express middleware
│   │   │   ├── 📄 auth.js                  # JWT authentication
│   │   │   ├── 📄 validation.js            # Zod validation wrapper
│   │   │   ├── 📄 rateLimiter.js           # Rate limiting configs
│   │   │   └── 📄 errorHandler.js          # Error handling
│   │   │
│   │   ├── 📂 routes/                      # API routes
│   │   │   ├── 📄 publicRoutes.js          # Public endpoints
│   │   │   └── 📄 adminRoutes.js           # Protected endpoints
│   │   │
│   │   ├── 📂 services/                    # Business logic
│   │   │   ├── 📄 emailService.js          # Email notifications
│   │   │   └── 📄 uploadService.js         # Cloudinary uploads
│   │   │
│   │   ├── 📂 utils/                       # Utility functions
│   │   │   ├── 📄 helpers.js               # Helper functions
│   │   │   └── 📄 validators.js            # Zod schemas
│   │   │
│   │   └── 📄 app.js                       # Express app setup
│   │
│   ├── 📂 prisma/
│   │   ├── 📄 schema.prisma                # Database schema
│   │   └── 📄 seed.js                      # Database seeding
│   │
│   ├── 📄 server.js                        # Entry point
│   ├── 📄 package.json                     # Dependencies
│   ├── 📄 .env.example                     # Environment template
│   ├── 📄 .env                             # Environment variables (gitignored)
│   ├── 📄 .gitignore                       # Git ignore rules
│   └── 📄 README.md                        # Backend documentation
│
├── 📂 src/                                  # Frontend Application
│   ├── 📂 api/                             # ⭐ API Integration Layer
│   │   ├── 📄 client.js                    # Base API client with auth
│   │   ├── 📄 enquiries.js                 # Enquiry API calls
│   │   ├── 📄 callbacks.js                 # Callback API calls
│   │   ├── 📄 projects.js                  # Projects API calls
│   │   ├── 📄 gallery.js                   # Gallery API calls
│   │   ├── 📄 settings.js                  # Settings API calls
│   │   ├── 📄 admin.js                     # Admin auth API calls
│   │   └── 📄 index.js                     # API exports
│   │
│   ├── 📂 hooks/                           # ⭐ Custom React Hooks
│   │   ├── 📄 useProjects.js               # Fetch projects hook
│   │   ├── 📄 useGallery.js                # Fetch gallery hook
│   │   ├── 📄 useSettings.js               # Fetch settings hook
│   │   └── 📄 index.js                     # Hooks exports
│   │
│   ├── 📂 components/                      # React Components
│   │   ├── 📄 Navbar.jsx                   # Navigation bar
│   │   ├── 📄 Hero.jsx                     # Hero section
│   │   ├── 📄 Stats.jsx                    # Statistics section
│   │   ├── 📄 About.jsx                    # About section
│   │   ├── 📄 Services.jsx                 # Services section
│   │   ├── 📄 Projects.jsx                 # ✏️ Projects (API connected)
│   │   ├── 📄 Gallery.jsx                  # ✏️ Gallery (API connected)
│   │   ├── 📄 Contact.jsx                  # ✏️ Contact form (API connected)
│   │   ├── 📄 Footer.jsx                   # Footer
│   │   ├── 📄 WhatsAppButton.jsx           # ✏️ WhatsApp (API connected)
│   │   └── 📄 BuildingBackground.jsx       # Background animation
│   │
│   ├── 📂 assets/                          # Static assets
│   │   ├── 🖼️ hero.png
│   │   ├── 🖼️ react.svg
│   │   └── 🖼️ vite.svg
│   │
│   ├── 📄 App.jsx                          # Main app component
│   ├── 📄 main.jsx                         # React entry point
│   ├── 📄 index.css                        # Global styles
│   └── 📄 App.css                          # App styles
│
├── 📂 public/                               # Public assets
│   ├── 📂 images/                          # Image assets
│   ├── 📂 videos/
│   │   └── 🎬 hero.mp4                     # Hero video
│   ├── 🖼️ favicon.svg                      # Favicon
│   ├── 🖼️ icons.svg                        # Icon sprites
│   └── 🖼️ logo.png                         # Company logo
│
├── 📂 node_modules/                         # Dependencies (gitignored)
│
├── 📄 package.json                          # Frontend dependencies
├── 📄 package-lock.json                     # Lock file
├── 📄 vite.config.js                        # Vite configuration
├── 📄 tailwind.config.js                    # Tailwind configuration
├── 📄 postcss.config.js                     # PostCSS configuration
├── 📄 eslint.config.js                      # ESLint configuration
├── 📄 index.html                            # HTML entry point
│
├── 📄 .env                                  # ⭐ Frontend environment (gitignored)
├── 📄 .env.example                          # ⭐ Environment template
├── 📄 .gitignore                            # ✏️ Git ignore rules
│
├── 📂 Documentation/                        # ⭐ Project Documentation
│   ├── 📄 QUICK_START.md                   # 5-minute setup guide
│   ├── 📄 FULLSTACK_SETUP.md               # Complete setup guide
│   ├── 📄 INTEGRATION_GUIDE.md             # Integration details
│   ├── 📄 ARCHITECTURE.md                  # System architecture
│   ├── 📄 PROJECT_SUMMARY.md               # Project overview
│   ├── 📄 DEPLOYMENT_CHECKLIST.md          # Deployment guide
│   └── 📄 FILE_STRUCTURE.md                # This file
│
└── 📄 README.md                             # Main project README

```

## 📊 File Statistics

### Backend
- **Total Files**: 25+
- **Lines of Code**: ~2,500
- **Controllers**: 6
- **Routes**: 2
- **Middleware**: 4
- **Services**: 2
- **Models**: 6

### Frontend
- **Total Files**: 30+
- **Lines of Code**: ~3,000
- **Components**: 11
- **API Modules**: 7
- **Hooks**: 3
- **Pages**: 1 (SPA)

### Documentation
- **Total Files**: 7
- **Lines**: ~2,000
- **Guides**: 5
- **References**: 2

## 🎯 Key Directories

### `/backend/src/`
Core backend application code organized by responsibility.

### `/src/api/`
**NEW** - Frontend API integration layer. All backend communication goes through here.

### `/src/hooks/`
**NEW** - Custom React hooks for data fetching and state management.

### `/src/components/`
React components. Four components updated to connect with backend.

### `/backend/prisma/`
Database schema and seeding scripts.

## 📝 File Purposes

### Backend Core Files

| File | Purpose |
|------|---------|
| `server.js` | Application entry point |
| `app.js` | Express app configuration |
| `database.js` | Prisma client setup |
| `schema.prisma` | Database schema definition |

### Frontend Core Files

| File | Purpose |
|------|---------|
| `main.jsx` | React entry point |
| `App.jsx` | Main app component |
| `client.js` | API client with auth |
| `index.js` (api) | API exports |

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `eslint.config.js` | ESLint rules |
| `.env` | Environment variables |

## 🔄 Data Flow

```
User Interaction
    ↓
Component (Contact.jsx, Projects.jsx, etc.)
    ↓
Custom Hook (useProjects, useGallery, etc.)
    ↓
API Module (projectsApi, galleryApi, etc.)
    ↓
API Client (client.js)
    ↓
HTTP Request
    ↓
Backend Route (publicRoutes.js, adminRoutes.js)
    ↓
Middleware (auth, validation, rateLimiter)
    ↓
Controller (projectController, etc.)
    ↓
Service (emailService, uploadService)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
```

## 🎨 Component Hierarchy

```
App.jsx
├── BuildingBackground.jsx
├── Navbar.jsx
├── Hero.jsx
├── Stats.jsx
├── About.jsx
├── Services.jsx
├── Projects.jsx (uses useProjects hook)
├── Gallery.jsx (uses useGallery hook)
├── Contact.jsx (uses enquiriesApi + useSettings)
├── Footer.jsx
└── WhatsAppButton.jsx (uses useSettings hook)
```

## 🔐 Protected vs Public Files

### Public (No Auth)
- All frontend files
- Public API endpoints
- Static assets

### Protected (Auth Required)
- Admin API endpoints
- Database direct access
- Environment variables
- Backend configuration

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "framer-motion": "^10.x",
  "tailwindcss": "^3.x"
}
```

### Backend
```json
{
  "@prisma/client": "^5.x",
  "express": "^4.x",
  "bcrypt": "^5.x",
  "jsonwebtoken": "^9.x",
  "zod": "^3.x",
  "cloudinary": "^2.x",
  "nodemailer": "^6.x",
  "multer": "^1.x"
}
```

## 🚀 Build Output

### Frontend Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images]
└── [other assets]
```

### Backend (No Build)
Runs directly with Node.js. No build step required.

## 🔍 Important Files to Know

### Must Configure
1. `backend/.env` - Backend environment variables
2. `.env` - Frontend environment variables
3. `backend/prisma/schema.prisma` - Database schema

### Must Review
1. `src/api/client.js` - API client configuration
2. `backend/src/middleware/auth.js` - Authentication logic
3. `backend/src/routes/` - API endpoints

### Must Customize
1. `backend/prisma/seed.js` - Initial data
2. `src/components/Contact.jsx` - Contact form
3. `backend/src/services/emailService.js` - Email templates

## 📚 Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `QUICK_START.md` | 5-min setup | Developers |
| `FULLSTACK_SETUP.md` | Complete guide | Developers |
| `INTEGRATION_GUIDE.md` | API integration | Developers |
| `ARCHITECTURE.md` | System design | Architects |
| `PROJECT_SUMMARY.md` | Overview | Everyone |
| `DEPLOYMENT_CHECKLIST.md` | Deploy guide | DevOps |
| `FILE_STRUCTURE.md` | This file | Everyone |

## 🎯 Quick Navigation

**Need to add a new API endpoint?**
→ `backend/src/routes/` + `backend/src/controllers/`

**Need to fetch data in frontend?**
→ `src/api/` + `src/hooks/`

**Need to update database schema?**
→ `backend/prisma/schema.prisma`

**Need to change styling?**
→ `src/components/` + `tailwind.config.js`

**Need to configure environment?**
→ `.env` (frontend) + `backend/.env` (backend)

---

This structure provides a clean, organized, and scalable foundation for the TS SHIVA JI ENTERPRISES website!
