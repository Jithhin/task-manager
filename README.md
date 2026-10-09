# Task Manager API

A simple REST API built using Node.js and Express.js to manage tasks. This project helps me learn backend development and REST API fundamentals.

## Features

- Create a task
- Retrieve all tasks
- Update a task
- Delete a task

## Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API

## Installation and Setup

1. Clone the repository.
2. Open the project folder in your terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server using the command configured in your project:

   ```bash
   node server.js
   ```

## API Endpoints

Base URL: `http://localhost:3000`

Method      : GET 
Endpoint    :`/api/tasks`
Description :Retrieve all tasks 

Method      : GET  
Endpoint    : `/api/tasks/:id`  
Description : Retrieve a task by ID 
 
 Method     : POST  
 Endpoint   : `/api/tasks`  
 Description: Create a new task 
 
 Method     : PUT 
 Endpoint   : `/api/tasks/:id` 
Description : Update an existing task 

 Method     : DELETE 
 Endpoint   : `/api/tasks/:id` 
Description :  Delete a task 

##Example Request

Create a task using `POST /api/tasks` with this JSON body:

```json
{
  "title": "Learn Node.js",
  "description": "Learn backend development",
  "completed": false
}
```

## Learning Goals

- Understand Node.js and Express.js
- Learn REST API development
- Practice HTTP methods and status codes
- Understand CRUD operations
