import { Router } from 'express';
import { signInUser, signUpUser, signOutUser } from '../controllers/auth.controllers.js';

const router = Router();

router.route('/signup').post(signUpUser);
router.route('/signin').post(signInUser);
router.route('/signout').post(signOutUser);

export default router;
