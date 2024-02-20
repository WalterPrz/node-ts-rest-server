import { Request, Response } from "express"
import { text } from "stream/consumers"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
const todos = [
    { id: 1, text: 'bulk milk', completedAt: new Date() },
    { id: 2, text: 'bulk bread', completedAt: null },
    { id: 3, text: 'bulk butter', completedAt: new Date() },
]
export class TodosController {
    //*  DI
    constructor() {

    };
    public getTodos = async (req: Request, res: Response): Promise<Response> => {
        const todos = await prisma.todo.findMany({});
        return res.json(todos)
    }
    public getTodoId = async (req: Request, res: Response): Promise<Response> => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = await prisma.todo.findUnique({
            where: { id: id }
        })
        return todo ? res.json(todo) : res.status(404).json({ error: `TODO WITH ${id} not found` })
    }
    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error })
        if (!text) res.status(400).json({ error: 'Text property is required' })

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo)
    }
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error })

        const todo = await prisma.todo.findUnique({
            where: { id: id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        await prisma.todo.update({
            where: { id: Number(id) },
            data: updateTodoDto!.values,
        })
        res.json(todo)
    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = await prisma.todo.findUnique({
            where: { id: id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        const deleteTodo = await prisma.todo.delete({
            where: {
                id
            },
        })
        res.json(deleteTodo)
    }

}