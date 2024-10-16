import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Storage for chores to do
let todos = [];

// Routes
// Get all chores todo
app.get('/todos', (req, res) => {
    res.json(todos); // Return the list of todos
});

// Create a new chore todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1, // Simple ID generation
        task: req.body.task,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a chore todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
});

// Delete a chore
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Todo not found');
    }
    todos.splice(index, 1);
    res.sendStatus(204); // No content
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
