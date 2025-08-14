# Chai aur Baatcheet 🍵

"Jahan har message ek nayi kahani shuru karta hai." (Where every message starts a new story.)

A modern, interactive web application that combines a real-time-like chat experience with AI-powered assistance. This project features distinct AI personas, each with a unique style, for an engaging and personalized user experience.

## ✨ Features

* **Interactive Chat Interface**: A clean and responsive chat UI for seamless conversation.

* **AI-Powered Personas**: Chat with two distinct AI personalities, based on tech educators Hitesh Choudhary and Piyush Garg.

* **Hindi-centric Communication**: AI personas are designed to communicate in a casual, relatable Hindi tone.

* **Real-time Feel**: The chat interface provides an engaging, responsive feel for smooth user interaction.

* **Modern Tech Stack**: Built with a robust combination of modern frontend and backend technologies.

## 💻 Tech Stack

### Frontend

* **React**: A JavaScript library for building user interfaces.

* **Vite**: A fast build tool for modern web projects.

* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

* **Shadcn/UI**: A collection of reusable components.

* **Axios**: A promise-based HTTP client for making API requests.

### Backend

* **Node.js & Express**: A fast, unopinionated web framework for Node.js.

* **CORS**: Middleware to enable cross-origin resource sharing.

* **OpenAI SDK**: Used to interact with the Gemini API for generative AI.

* **dotenv**: A zero-dependency module that loads environment variables from a `.env` file.

## 🚀 Getting Started

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Backend Setup

1. Navigate to the `backend` directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with your Gemini API key:

   ```
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
   ```

4. Start the backend server:

   ```bash
   npm run start # Or your configured start script
   ```

   The server will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the `frontend` directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and specify the backend URL:

   ```
   VITE_BACKEND_URL="http://localhost:3000"
   ```

   *Note: If you deploy your backend to a service like Render, you will need to update this URL.*

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or another port specified by Vite).

## 📄 API Endpoints

The backend exposes two main API endpoints for the chat functionality:

| Endpoint         | Method | Description                                                                |
| ---------------- | ------ | -------------------------------------------------------------------------- |
| `/hiteshsir`     | `POST` | Interacts with the AI persona of Hitesh Choudhary.                         |
| `/piyushsir`     | `POST` | Interacts with the AI persona of Piyush Garg.                              |

Each endpoint expects a JSON body with `question` and `history` fields.

## 📂 File Structure

```
.
├── backend/
│   ├── index.js                  # Main server file
│   ├── package.json              # Backend dependencies
│   ├── Response_genrator.js      # Handles AI response generation
│   ├── persona.js                # Defines AI persona data
│   └── systemPrompt.js           # System prompts for AI models
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx        # Application header component
    │   │   └── ChatInterface.tsx # Main chat UI component
    │   ├── pages/
    │   │   ├── Index.tsx         # Main landing page
    │   │   └── NotFound.tsx      # 404 page
    │   ├── App.tsx               # Main routing component
    │   ├── main.tsx              # Entry point for React
    │   ├── index.css             # Tailwind CSS base styles & design system
    │   └── ...                   # Other CSS and configuration files
    ├── public/
    └── ...                       # Other frontend files
```

## 📜 License

This project is licensed under the ISC License.
