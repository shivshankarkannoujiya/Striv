import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';
import { sendWelcomeEmail } from '../utils/emailHandler.js';
import { generateToken } from '../utils/token.js';

const signUpUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User with email already registered',
            });
        }

        const user = await User.create({
            fullName,
            email,
            password,
        });

        const createduser = await User.findById(user._id).select('-password');
        if (!createduser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        generateToken(createduser._id, res);

        res.status(201).json({
            success: true,
            data: { user: createduser },
            message: 'User registered successfully',
        });

        sendWelcomeEmail(createduser.email, createduser.fullName, process.env.CLIENT_URL).catch(
            (error) => console.error('Failed to send welcome email:', error)
        );
    } catch (error) {
        console.error('Error while registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        const isPasswordValid = user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        generateToken(user._id, res);

        const loggedInUser = await User.findById(user._id).select('-password');

        res.status(200).json({
            success: true,
            data: { user: loggedInUser },
            message: 'User loggedIn successfully',
        });
    } catch (error) {
        console.error('Error login User: ', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while logIn user',
        });
    }
};

const signOutUser = async (_, res) => {
    try {
        res.status(200)
            .cookie('jwt', '', { maxAge: 0 })
            .json({ message: 'User Logged out successfully' });
    } catch (error) {
        console.error('Error logout user: ', error);
        return res.status(500).json({ message: 'Semething went wrong while logout user' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!req.file) {
            return res.status(400).json({ message: 'Profile pic is required' });
        }

        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePic: uploadResponse.secure_url,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: { user: updatedUser },
            message: 'User profile update successfully',
        });
    } catch (error) {
        console.error('Error while updating user profilepic: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: { user: req.user },
            message: 'User fetched successfully',
        });
    } catch (error) {
        console.error('Error while fetching user: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server Error',
        });
    }
};

export { signUpUser, signInUser, signOutUser, updateUserProfile, getMe };
