import express from 'express';
import multer from 'multer';
import { login, getMe } from '../controllers/authController.js';
import { getAllEnquiries, updateEnquiryStatus } from '../controllers/enquiryController.js';
import { getAllCallbacks, updateCallbackStatus } from '../controllers/callbackController.js';
import { createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { getAllSettings, updateSettings } from '../controllers/settingsController.js';
import { getDashboardStats } from '../controllers/statsController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { loginSchema, projectSchema, gallerySchema } from '../utils/validators.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Auth
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', authenticate, getMe);

// Enquiries
router.get('/enquiries', authenticate, getAllEnquiries);
router.patch('/enquiries/:id', authenticate, updateEnquiryStatus);

// Callbacks
router.get('/callbacks', authenticate, getAllCallbacks);
router.patch('/callbacks/:id', authenticate, updateCallbackStatus);

// Projects
router.post('/projects', authenticate, upload.single('coverImage'), createProject);
router.patch('/projects/:id', authenticate, upload.single('coverImage'), updateProject);
router.delete('/projects/:id', authenticate, deleteProject);

// Gallery
router.post('/gallery', authenticate, upload.single('image'), createGalleryItem);
router.patch('/gallery/:id', authenticate, upload.single('image'), updateGalleryItem);
router.delete('/gallery/:id', authenticate, deleteGalleryItem);

// Settings
router.get('/settings', authenticate, getAllSettings);
router.patch('/settings', authenticate, updateSettings);

// Stats
router.get('/stats/dashboard', authenticate, getDashboardStats);

export default router;
