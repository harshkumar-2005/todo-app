import User from '../models/user.js';
import verified from '../utils/verify.js';

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

        res.status(200).json({
            success: true,
            message: "You are logged in successfully.",
            user: {
                id: found._id,
                email: found.email
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