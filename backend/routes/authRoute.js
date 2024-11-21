import express from 'express'
import { signup,signin,google,forgotpassword } from '../controller/authController.js';
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.post('/forgot-password',forgotpassword)
export default router;