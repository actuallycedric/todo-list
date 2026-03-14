# To-Do List (React + Supabase)

A simple full-stack to-do list application built to experiment with modern front-end tooling and basic backend integration.

The application allows users to create and store tasks, with all task data persisted in a **Supabase** database rather than local state. This project was primarily built as a learning exercise to understand how a React front-end can communicate with a hosted backend service.

## Features

* Add new tasks to a persistent database
* Retrieve tasks from Supabase on load
* Simple and responsive UI
* Basic client → backend data flow using Supabase

## Tech Stack

* **HTML5** – Page structure
* **CSS3** – Styling and layout
* **React.js** – Component-based front-end
* **Supabase** – Backend database and API layer

## Project Purpose

This project was built to:

* Practice building a small React application
* Learn how to integrate a frontend with a hosted backend service
* Understand basic CRUD-style interactions with a database
* Explore how modern web apps persist data beyond local storage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

The app should now be running locally.

## Future Improvements

* Task deletion and editing
* Task completion states
* User authentication
* Filtering and sorting tasks
* Improved UI/UX

## License

This project is for learning purposes.
