import User from '../models/user.js'
import hash from '../utils/hash.js'

const signup = async (req, res) => {
    
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fiels are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email."
            })
        }

        if (password.length < 7) {
            return res.status(400).json({
                success: false,
                message: "Password must be of 7 characters"
            })
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!regex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            })
        }

        const hashedPassword = await hash(password);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export default signup;