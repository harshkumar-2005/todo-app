import User from '../models/user.js';
import verified from '../utils/verify.js';
import cookieParser from 'cookie-parser';

const login = async (req, res) => {
    const { email, password, token } = req.body; // token is set by the middleware 

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

        // Attach token securely
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
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