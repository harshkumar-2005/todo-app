import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();


import connect from './connection/dbConnection.js';
import userRoute from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

connect(mongoUrl);

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", //  React app
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Personal Routes
app.use('/v1/api/todo/user', userRoute);
app.use('/v1/api/todo', todoRoutes);

app.get('/v1/api/todo/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Health is good...........'
    })
})

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
})