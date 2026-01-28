import express from 'express';
import createTodo from '../controllers/createTodo.js';
import deleteTodo from '../controllers/deleteTodo.js';
import toggleStatus from '../controllers/todoStatusToggel.js';

const todoRouter = express.Router();

todoRouter.post('/create', createTodo);

todoRouter.delete('/:id', deleteTodo);

todoRouter.patch('/toggle/status/:id', toggleStatus);


export default todoRouter;