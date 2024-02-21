import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository";


export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new TodoDatasourceImpl()
        const respository = new TodoRepositoryImpl(datasource)
        const todosController = new TodosController(datasource)
        router.get('/', todosController.getTodos)
        router.get('/:id', todosController.getTodoId)
        router.post('/', todosController.createTodo)
        router.put('/:id', todosController.updateTodo)
        router.delete('/:id', todosController.deleteTodo)
        return router
    }
}