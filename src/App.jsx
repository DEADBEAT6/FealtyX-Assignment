// src/App.jsx
import React from "react";
import { useAuth } from "./context/AuthContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {user ? (
        <>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
            <button
              onClick={logout}
              className="bg-red-500 text-white p-2 rounded"
            >
              Logout
            </button>
          </header>
          <TaskForm />
          <TaskList />
          <Dashboard />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
