import User from '../models/user.js';
import verified from '../utils/verify.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const found = await User.findOne({ email });

        if (!found) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const Match = await verified(password, found.password);
        if (!Match) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })

        }

        // Create token
        const token = jwt.sign(
            {
                email: found.email,
                userId: found._id
            },
            secret,
            { expiresIn: "7d" }
        );

        // Attach token securely
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false, // Set to false for development (localhost)
            path: '/'
        });


        res.status(200).json({
            success: true,
            message: "You are logged in successfully.",
            user: {
                id: found._id,
                email: found.email,
                token: token
            }
        })

    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default login;