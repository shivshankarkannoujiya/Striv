import { User } from '../models/user.model.js';

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

        return res.status(201).json({
            success: true,
            data: { user: createduser },
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error('Error while registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const signInUser = async (req, res) => {};
const logOutUser = async (req, res) => {};
