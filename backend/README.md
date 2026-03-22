# TS SHIVA JI ENTERPRISES Backend

Production-ready backend for company website with Node.js, Express, PostgreSQL, and Prisma.

## Features

- ✅ Clean architecture with modular structure
- ✅ JWT authentication for admin
- ✅ PostgreSQL database with Prisma ORM
- ✅ Image upload with Cloudinary
- ✅ Email notifications with Nodemailer
- ✅ Rate limiting and security middleware
- ✅ Input validation with Zod
- ✅ Error handling
- ✅ RESTful API design

## Tech Stack

- Node.js & Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Cloudinary (images)
- Nodemailer (email)
- Zod (validation)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT
- `CLOUDINARY_*` - Cloudinary credentials
- `EMAIL_*` - Email service credentials

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (creates admin user)
npm run prisma:seed
```

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Public APIs

```
POST   /api/enquiries              - Submit enquiry
POST   /api/callback-requests      - Request callback
GET    /api/projects               - Get all projects
GET    /api/projects/featured      - Get featured projects
GET    /api/projects/:slug         - Get project by slug
GET    /api/gallery                - Get gallery items
GET    /api/settings/public        - Get public settings
```

### Admin APIs (Protected)

```
POST   /api/admin/login            - Admin login
GET    /api/admin/me               - Get current admin

GET    /api/admin/enquiries        - Get all enquiries
PATCH  /api/admin/enquiries/:id    - Update enquiry status

GET    /api/admin/callbacks        - Get callback requests
PATCH  /api/admin/callbacks/:id    - Update callback status

POST   /api/admin/projects         - Create project
PATCH  /api/admin/projects/:id     - Update project
DELETE /api/admin/projects/:id     - Delete project

POST   /api/admin/gallery          - Create gallery item
PATCH  /api/admin/gallery/:id      - Update gallery item
DELETE /api/admin/gallery/:id      - Delete gallery item

GET    /api/admin/settings         - Get all settings
PATCH  /api/admin/settings         - Update settings
```

## Database Models

- `AdminUser` - Admin authentication
- `Enquiry` - Customer enquiries
- `CallbackRequest` - Callback requests
- `Project` - Company projects
- `GalleryItem` - Gallery images
- `SiteSetting` - Site configuration

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on public endpoints
- Input validation with Zod
- CORS configuration
- Environment variable protection

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── email.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── enquiryController.js
│   │   ├── callbackController.js
│   │   ├── projectController.js
│   │   ├── galleryController.js
│   │   └── settingsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── publicRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── uploadService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── validators.js
│   └── app.js
├── server.js
├── package.json
└── .env.example
```

## Default Admin Credentials

After seeding:
- Email: `admin@tsshivaji.com`
- Password: `Admin@123`

**⚠️ Change these in production!**

## Useful Commands

```bash
# View database in browser
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Reset database
npx prisma migrate reset

# Format Prisma schema
npx prisma format
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure production database
4. Set up proper CORS origins
5. Enable HTTPS
6. Configure email service
7. Set up Cloudinary account
8. Change default admin credentials

## Support

For issues or questions, contact the development team.
