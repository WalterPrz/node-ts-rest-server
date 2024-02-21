import { Request, Response } from "express"
import { text } from "stream/consumers"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { TodoEntity, TodoRepository } from "../../domain"
const todos = [
    { id: 1, text: 'bulk milk', completedAt: new Date() },
    { id: 2, text: 'bulk bread', completedAt: null },
    { id: 3, text: 'bulk butter', completedAt: new Date() },
]
export class TodosController {
    //*  DI
    constructor(private readonly todoRepository: TodoRepository) {

    };
    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll()
        return res.json(todos)
    }
    public getTodoId = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const todo = await this.todoRepository.findById(id)
            return res.json(todo)
        } catch (error) {
            res.status(400).json({ error })
        }
    }
    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error })
        const todo = await this.todoRepository.create(createTodoDto!)
        res.json(todo);
    }
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error })

        const todo = await this.todoRepository.updateById(updateTodoDto!)
        return res.json(todo)
    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        try {
            const deleteTodo = await this.todoRepository.deleteById(id)
            res.json(deleteTodo)
        } catch (error) {
            res.status(400).json({ error })
        }
    }

}