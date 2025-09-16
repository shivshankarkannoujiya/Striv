import { Router } from 'express';
import {
    getAllContacts,
    getChatFriends,
    getMessagesByUserId,
    sendMessage,
} from '../controllers/message.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/contacts').get(getAllContacts);
router.route('/chats').get(getChatFriends);
router.route('/:id').get(getMessagesByUserId);
router.route('/send/:id').post(sendMessage);

export default router;
