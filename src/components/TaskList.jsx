// src/components/TaskList.jsx
import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { useAuth } from "../context/AuthContext";

const TaskList = () => {
  const { tasks } = useTasks();
  const { user } = useAuth(); // Get the current logged-in user
  const [sortCriteria, setSortCriteria] = useState("priority");

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Filter tasks assigned to the current user and assigned by the current user
  const assignedToMe = tasks.filter(
    (task) => task.assignee === user.username // Tasks assigned to the user
  );

  const assignedByMe = tasks.filter(
    (task) => task.creator === user.username // Tasks created by the user
  );

  // Sort tasks based on the selected criteria
  const sortTasks = (tasksList) => {
    return [...tasksList].sort((a, b) => {
      if (sortCriteria === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortCriteria === "status") {
        const statusOrder = { Open: 1, "In Progress": 2, Closed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      } else {
        return 0;
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Tasks assigned to the user */}
        <div>
          <h3 className="font-bold text-lg mb-2">Tasks Assigned to Me</h3>
          {assignedToMe.length === 0 ? (
            <p>No tasks assigned to you.</p>
          ) : (
            sortTasks(assignedToMe).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>

        {/* Column 2: Tasks assigned by the user */}
        <div>
          <h3 className="font-bold text-lg mb-2">Tasks Assigned by Me</h3>
          {assignedByMe.length === 0 ? (
            <p>No tasks assigned by you.</p>
          ) : (
            sortTasks(assignedByMe).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
