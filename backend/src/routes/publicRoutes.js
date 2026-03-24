import express from 'express';
import { createEnquiry } from '../controllers/enquiryController.js';
import { createCallbackRequest } from '../controllers/callbackController.js';
import { getAllProjects, getFeaturedProjects, getProjectBySlug } from '../controllers/projectController.js';
import { getAllGalleryItems } from '../controllers/galleryController.js';
import { getPublicSettings } from '../controllers/settingsController.js';
import { incrementVisits } from '../controllers/statsController.js';
import { validate } from '../middleware/validation.js';
import { enquirySchema, callbackSchema } from '../utils/validators.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Enquiries
router.post('/enquiries', enquiryLimiter, validate(enquirySchema), createEnquiry);

// Callback Requests
router.post('/callback-requests', enquiryLimiter, validate(callbackSchema), createCallbackRequest);

// Projects
router.get('/projects', getAllProjects);
router.get('/projects/featured', getFeaturedProjects);
router.get('/projects/:slug', getProjectBySlug);

// Gallery
router.get('/gallery', getAllGalleryItems);

// Settings
router.get('/settings/public', getPublicSettings);

// Stats
router.post('/visits/increment', incrementVisits);

export default router;
