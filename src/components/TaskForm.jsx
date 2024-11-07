// src/components/TaskForm.jsx
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const TaskForm = () => {
  const { addTask } = useTasks();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignee: "",
    timeSpent: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...formData, creator: user.username, id: Date.now() });
    setFormData({ title: "", description: "", priority: "Low", status: "Open", assignee: "", timeSpent: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        placeholder="Task Description"
        required
      />
      <div className="flex space-x-4">
        <select name="priority" value={formData.priority} onChange={handleChange} className="p-2 border rounded">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <input
        type="text"
        name="assignee"
        value={formData.assignee}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        placeholder="Assignee Username"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
