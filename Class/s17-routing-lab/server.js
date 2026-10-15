import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { AppError } from './utils/appError.js';
import { loadEnvFile } from "node:process";
import {connectDB} from "./config/db.js";
import {createUser} from "./services/user-service.js";
const app = express();
const PORT = 3000;


loadEnvFile();
const dbuser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = 'test';

const mongoURL = process.env.MONGODB_URL || (
    dbuser && dbPass
        ? `mongodb+srv://${encodeURIComponent(dbuser)}:${encodeURIComponent(dbPass)}@cluster0.mgz6yfx.mongodb.net/${dbName}`
        : undefined
);
await connectDB(mongoURL);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('client'));

app.use('/api/auth', authRoutes);
app.use('/api/initiatives', apiRoutes);

app.post('/api/users', async (req, res, next) => {
    try {
        const { username, name, email, password } = req.body || {};
        await createUser({ username, name, email, password });
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        next(error);
    }
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
