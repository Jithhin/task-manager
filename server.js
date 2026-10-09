const express = require('express');

const app = express();
app.use(express.json());

const tasks = [
  {
    id: 1,
    title: 'Learn Node.js',
    description: 'Learn the basics of Node.js',
    completed: false
  },
  {
    id: 2,
    title: 'Build Task Manager API',
    description: 'Create my first REST API',
    completed: false
  }
];


app.get(['/tasks', '/api/tasks'], (req, res) => {
  let filteredTasks = tasks;

  const { completed } = req.query;

  if (completed !== undefined) {
    if (completed !== 'true' && completed !== 'false') {
      return res.status(400).json({
        message: 'Completed must be true or false'
      });
    }

    filteredTasks = tasks.filter(
      task => task.completed === (completed === 'true')
    );
  }
  const { search } = req.query;

if (search !== undefined) {
  if (typeof search !== 'string') {
    return res.status(400).json({
      message: 'Search must be a string'
    });
  }

  filteredTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(search.trim().toLowerCase())
  );
}

  res.json(filteredTasks);
});


app.get(['/tasks/:id', '/api/tasks/:id'], (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: 'Task ID must be a positive integer'
    });
  }

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json(task);
});

app.post(['/tasks', '/api/tasks'], (req, res) => {
  const { title, description, completed } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      message: 'Title is required and must be a non-empty string'
    });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({
      message: 'Description is required and must be a non-empty string'
    });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({
      message: 'Completed is required and must be a boolean'
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title: title.trim(),
    description: description.trim(),
    completed
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put(['/tasks/:id', '/api/tasks/:id'], (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, completed } = req.body;

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: 'Task ID must be a positive integer'
    });
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      message: 'Title is required and must be a non-empty string'
    });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({
      message: 'Description is required and must be a non-empty string'
    });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({
      message: 'Completed is required and must be a boolean'
    });
  }

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  task.title = title.trim();
  task.description = description.trim();
  task.completed = completed;

  res.json(task);
});

app.delete(['/tasks/:id', '/api/tasks/:id'], (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  tasks.splice(taskIndex, 1);

  res.json({
    message: 'Task deleted successfully'
  });
});

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON format'
    });
  }

  res.status(500).json({
    message: 'Internal server error'
  });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = app;