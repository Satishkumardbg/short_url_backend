import express from 'express';
import { createAuthUrl, getAllAuthUrl } from '../controllers/authUrlController.js';

const router = express.Router();

router.post('/create', createAuthUrl);
router.get('/allAuthUrls', getAllAuthUrl);

export default router;