import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const createToken = (req, res, next) => {

    const { userId, email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const token = jwt.sign(
            {
                email: email,
                userId: userId
            },
            secret,
            { expiresIn: "7d" }
        );

        req.body.token = token;
        next();
    } catch (error) {
        console.error("JWT creation error:", error);
        return res.status(500).json({ message: "Token generation failed" });
    }
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token." });
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export { createToken, verifyToken };
