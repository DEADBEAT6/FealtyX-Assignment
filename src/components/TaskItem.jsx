// src/components/TaskItem.jsx
import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask, startTimer, stopTimer } = useTasks();
  const { user } = useAuth();
  const [status, setStatus] = useState(task.status);
  const [timeDisplay, setTimeDisplay] = useState(formatTime(task.timeSpent));

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateTask({ ...task, status: e.target.value });
  };

  // Start or stop timer based on current state
  const handleTimerToggle = () => {
    if (task.timerRunning) {
      stopTimer(task.id);
    } else {
      startTimer(task.id);
      setStatus("In Progress");
    }
  };

  // Update time display every second if timer is running
  useEffect(() => {
    let interval;
    if (task.timerRunning) {
      interval = setInterval(() => {
        const elapsed = Date.now() - task.lastStartTime + task.timeSpent;
        setTimeDisplay(formatTime(elapsed));
      }, 1000);
    } else {
      setTimeDisplay(formatTime(task.timeSpent));
    }
    return () => clearInterval(interval);
  }, [task.timerRunning, task.timeSpent, task.lastStartTime]);

  // Format milliseconds to hours:minutes:seconds
  function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="border p-4 mb-4 rounded">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Status: {task.status}</p>

      {/* Timer display and controls */}
      {task.status !== "Closed" ? (
        <div className="mt-2">
          <p>Time Spent: {timeDisplay}</p>
          <button
            onClick={handleTimerToggle}
            className={`p-2 rounded ${
              task.timerRunning ? "bg-red-500" : "bg-green-500"
            } text-white mt-2`}
          >
            {task.timerRunning ? "Stop Timer" : "Start Timer"}
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <p>Time Spent: {timeDisplay}</p>
        </div>
      )}

      {user.username === task.assignee && (
        <select
          value={status}
          onChange={handleStatusChange}
          className="p-2 border rounded mt-2"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      )}
      {user.username === task.creator && (
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white p-1 rounded mt-2"
        >
          Delete Task
        </button>
      )}
    </div>
  );
};

export default TaskItem;
