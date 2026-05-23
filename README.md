# Inspirational Homepage

## Purpose
The Inspirational Homepage is a modern, dynamic web application designed to start your day right. It serves as a personal dashboard that provides users with a beautiful, calming background, a daily inspirational quote, the current weather, and a customized daily to-do list. The goal of this project is to replace standard blank browser tabs with an experience that promotes focus, positivity, and productivity.

## Technologies Used
This project was built using a modern frontend stack to ensure high performance, maintainability, and a seamless user experience:
- **React.js**: Used as the core library for building reusable, reactive UI components.
- **Redux Toolkit**: Serves as the central state management system to handle local storage, UI states, and complex data flows.
- **Vite**: A lightning-fast build tool and development server used to scaffold and bundle the application.
- **Tailwind CSS**: A utility-first CSS framework used for rapid, beautiful, and responsive styling (including glassmorphism effects).
- **@hello-pangea/dnd**: A drag-and-drop library used to power the reorderable task list.

## Features
- **Dynamic Backgrounds**: Users are greeted with a stunning, high-quality nature landscape fetched from the Unsplash API. Users can easily cycle between multiple fetched images.
- **Weather Widget**: A real-time weather display showing the current temperature, condition, and location fetched via the OpenWeather API.
- **Inspirational Quotes**: A daily rotating quote to provide motivation.
- **Dynamic Greeting**: The central greeting automatically updates based on the user's local time (Good morning, Good afternoon, Good evening).
- **Interactive Focus List (To-Do)**: 
  - Users can write down and track their main goals for the day.
  - Tasks can be easily checked off as completed, deleted, or edited inline.
  - **Drag and Drop**: Users can click and drag tasks to reorder them based on priority.
  - **Persistent Storage**: All goals are saved to the browser's `localStorage`, ensuring the list remains perfectly intact even after closing the browser or refreshing the page.

## Deployment
This application is configured for continuous deployment via **Netlify**. The `netlify.toml` file handles production build commands and ensures that Single Page Application (SPA) routing behaves correctly.
