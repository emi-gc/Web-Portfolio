import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { AppError } from './utils/appError.js';
import { loadEnvFile } from "node:process";
import {connectDB} from "./config/db.js";
import {createUser, findUser, findUsers} from "./services/user-service.js";
const app = express();
const PORT = 3000;


loadEnvFile();
const dbuser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = 'test';

const mongoURL = `mongodb+srv://${dbuser}:${dbPass}@cluster0.mgz6yfx.mongodb.net/${dbName}`;
await connectDB(mongoURL);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('client'));

app.use('/api/auth', authRoutes);
app.use('/api/initiatives', apiRoutes);

app.post('/api/users', async (req, res, next) => {
        const { username, name, email, password } = req.body;
        if(!username || !email || !password) return res.status(400).json({message: "All fields are required!"});
        createUser({ username, name, email, password}).then((user) => res.json(user)).catch((err) => next(err));
});

// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
