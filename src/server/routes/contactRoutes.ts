import express, { Router } from 'express';
import { handleContactForm } from '../controllers/contactController';

const router: Router = express.Router();

router.post('/contact', handleContactForm);

export default router; 