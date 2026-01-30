import express from 'express';
import createTodo from '../controllers/createTodo.js';
import deleteTodo from '../controllers/deleteTodo.js';
import toggleStatus from '../controllers/todoStatusToggel.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const todoRouter = express.Router();

todoRouter.post('/create', verifyToken, createTodo);

todoRouter.delete('/:id', verifyToken, deleteTodo);

todoRouter.patch('/toggle/status/:id', verifyToken, toggleStatus);


export default todoRouter;