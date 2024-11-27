# TodoMVC Clone

[LIVE DEMO](https://ruslanpashkov.com/projects/todomvc-clone/) _(you should probably wait about 1 minute for the backend to start)_

[REFERENCE](https://todomvc.com/examples/typescript-react/#/)

Yet another TodoMVC clone - this time with React, TypeScript, and SCSS, because the world desperately needed one more todo app. Backed by a [Fastify API](https://github.com/ruslanpashkov/todo-service), because localStorage was too mainstream.

## Features

- Add new todos with a title.
- Remove existing todos.
- Edit and update todo title.
- Mark todos as completed.

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory: `cd todomvc-clone`.
3. Install the dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Open your web browser and visit `http://localhost:3000` to view the application.

## API Integration

This application is integrated with the external API to manage todo data. The API endpoints used are as follows:

- `GET /todos`: Fetches the list of todos.
- `POST /todos`: Adds a new todo.
- `PUT /todos/:id`: Updates an existing todo.
- `DELETE /todos/:id`: Deletes a todo.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Sass (SCSS)](https://sass-lang.com/)

## License

This project is licensed under the [GNU GENERAL PUBLIC LICENSE](LICENSE).
