import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const todos = [{
        id: 1,
        title: 'some title',
        completed: false,
        priority: 3,
    },
    {
        id: 2,
        title: 'some title',
        completed: false,
        priority: 2,
    },
];
const app = express();
app.use(express.json());

app.get('/status', (req, res) => {
    res.send({ message: 'Hello From PROJECT11' });
});

app.get('/todos', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Retrieved all todos',
        data: todos,
    });
});

app.get('/todos/:id', (req, res) => {
    const matchTodo = todos.find(todo => todo.id === parseInt(req.params.id, 10));
    if (matchTodo) {
        res.status(200).json({
            status: 200,
            message: 'Fetched todo successful',
            data: matchTodo,
        });
    }
    res.sendStatus(404);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(todo => todo.id === id);
    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(204);
});

// HOMEWORK: create a route to modify one todo

app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const matchTodo = todos.find((todo) => todo.id === id);
    const todo = {
        title: req.body.title,
        priority: parseInt(req.body.priority, 10),
        completed: req.body.completed,
    };

    if (matchTodo) {
        if (todo.title || todo.priority || todo.completed) {
            if (todo.title) todos[id - 1].title = todo.title;
            if (todo.priority) todos[id - 1].priority = todo.priority;
            if (todo.completed) todos[id - 1].completed = todo.completed;

            res.status(200).json({
                status: 200,
                message: 'Changed article successfully',
                data: matchTodo,
            });
        }
    }

    res.sendStatus(404);
});

app.post('/todos', (req, res) => {
    const todo = {
        id: parseInt(req.body.id, 10),
        title: req.body.title,
        priority: parseInt(req.body.priority, 10),
        completed: req.body.completeds,
    };

    todos.push(todo);
    res.status(201).json({
        status: 201,
        message: 'Todo successfully created',
        data: todo,
    });
});

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App running on PORT: ${process.env.PORT}`);
});