import { Request, Response } from "express"
import { text } from "stream/consumers"
const todos = [
    { id: 1, text: 'bulk milk', completedAt: new Date() },
    { id: 2, text: 'bulk bread', completedAt: null },
    { id: 3, text: 'bulk butter', completedAt: new Date() },
]
export class TodosController {
    //*  DI
    constructor() {

    };
    public getTodos = (req: Request, res: Response): Response => {
        return res.json(todos)
    }
    public getTodoId = (req: Request, res: Response): Response => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = todos.find((item) => item.id === id)

        return todo ? res.json(todo) : res.status(404).json({ error: `TODO WITH ${id} not found` })
    }
    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) res.status(400).json({ error: 'Text property is required' })
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null,
        }
        todos.push(newTodo)
        res.json(newTodo)
    }
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = todos.find((item) => item.id === id)

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        const { text, completedAt } = req.body
        //! ES PASADO POR REFERENCIA (lo cual no se debe hacer, se hace con el foreach)
        todo.text = text || todo.text; //si viene un valor es el primero, si no es el segundo
        (completedAt === 'null') ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt)
        todos.forEach((todo, index) => {
            if (todo.id === id) {
                todos[index] = todo;
            }
        })
        res.json(todos)
    }
    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' })
        const todo = todos.find((item) => item.id === id)
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo)
    }
    
}