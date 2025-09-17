import { Router } from 'express';
import {
    signInUser,
    signUpUser,
    signOutUser,
    updateUserProfile,
    getMe,
} from '../controllers/auth.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import upload from '../utils/upload.js';

const router = Router();

router.route('/signup').post(signUpUser);
router.route('/signin').post(signInUser);
router.route('/signout').post(verifyJWT, signOutUser);
router.route('/update-profile').put(verifyJWT, upload.single('profilePic'), updateUserProfile);
router.route('/me').get(verifyJWT, getMe);

export default router;
