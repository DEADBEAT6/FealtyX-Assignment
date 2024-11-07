// src/components/LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Username"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
