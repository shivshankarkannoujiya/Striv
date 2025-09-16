import { Message } from '../models/message.model.js';
import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';

const getAllContacts = async (req, res) => {
    try {
        const loggedInUser = req.user?._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');

        res.status(200).json({
            success: true,
            data: { users: filteredUsers },
            message: 'All contacts fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching contacts: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user?._id;
        const { id: userToChatId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json({
            success: true,
            data: { messages },
            message: 'Fetched chat messages successfully',
        });
    } catch (error) {
        console.error('Error fetching chats: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const me_as_senderId = req.user?._id;
        const { id: receiverId } = req.params;

        if (!text && !image) {
            return res.status(400).json({
                message: 'Message is required',
            });
        }

        if (senderId === receiverId) {
            return res.status(400).json({
                message: 'Cannot send message to yourself',
            });
        }

        const existedReceiver = await User.exists({ _id: receiverId });
        if (!existedReceiver) {
            return res.status(404).json({
                message: 'Receiver not found',
            });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const message = await Message.create({
            senderId: me_as_senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        // TODO: Send message in real-time if user is online -socket
        res.status(201).json({
            success: true,
            data: { message },
            message: 'Message sent successfully',
        });
    } catch (error) {
        console.error('Error sending message: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getChatFriends = async (req, res) => {
    try {
        const loggedInUser = req.user?._id;

        const messages = await Message.find({
            $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
        });

        const chatFriendsIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUser.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            ),
        ];

        const chatFriends = await User.find({ _id: { $in: chatFriendsIds } }).select('-password');

        res.status(200).json({
            success: true,
            data: { chatFriends },
            message: 'Fetched chat friends successfully',
        });
    } catch (error) {
        console.error('Error fetching chat friends: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export { getAllContacts, getChatFriends, getMessagesByUserId, sendMessage };
