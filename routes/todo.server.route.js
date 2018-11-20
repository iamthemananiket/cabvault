// ./express-server/routes/todo.server.route.js
import express from 'express';
//import controller file
import * as todoController from '../controllers/todo.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/')
     .get(todoController.getTodos)
     .post(todoController.addTodo)
router.route('/:name')
      .get(todoController.getTodo)
      .delete(todoController.deleteTodo)
      .put(todoController.updateTodo);
export default router;