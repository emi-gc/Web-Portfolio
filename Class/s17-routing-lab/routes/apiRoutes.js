import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];
let nextId = 3;

router.route('/')
    .get(protect, (req, res) => {
        res.json(initiatives);
    })
    .post(protect, (req, res, next) => {
        const { title, priority } = req.body;

        if (!title || !priority) {
            return next(new AppError('Title and priority required', 400));
        }

        const initiative = {
            id: nextId++,
            title,
            priority,
            status: 'Active'
        };

        initiatives.push(initiative);
        res.status(201).json(initiative);
    });

router.route('/:id')
    .get(protect, (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const initiative = initiatives.find(item => item.id === id);

        if (!initiative) {
            return next(new AppError('Initiative not found', 404));
        }

        res.json(initiative);
    })
    .delete(protect, requireAdmin, (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const initiative = initiatives.find(item => item.id === id);

        if (!initiative) {
            return next(new AppError('Initiative not found', 404));
        }

        initiatives = initiatives.filter(item => item.id !== id);
        res.json({ message: 'Initiative deleted' });
    });
export default router;
