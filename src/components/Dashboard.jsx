// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { tasks } = useTasks(); // Get tasks from TaskContext
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Time Spent on Tasks (in hours)",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  });

  // Helper function to format time (in milliseconds) to hours
  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Prepare the chart data based on the tasks' timeSpent, but only if the task is marked as "Closed"
  useEffect(() => {
    const timeData = {};

    // Loop through tasks and accumulate timeSpent for each day only if the task is "Closed"
    tasks.forEach((task) => {
      if (task.status === "Closed" && task.timeSpent > 0) {
        const date = new Date(task.lastStartTime).toLocaleDateString(); // Format to MM/DD/YYYY

        if (!timeData[date]) {
          timeData[date] = 0;
        }
        timeData[date] += task.timeSpent; // Accumulate timeSpent for each date
      }
    });

    // Prepare chart labels (dates) and data (time spent)
    const dates = Object.keys(timeData).sort(); // Sort dates in ascending order
    const timeSpentOnTasks = dates.map((date) => timeData[date]);

    // Update chartData with the calculated values
    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Total Time Spent on Tasks (in hours)",
          data: timeSpentOnTasks.map((time) => time / (1000 * 60 * 60)), // Convert milliseconds to hours
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    });
  }, [tasks]); // Only run this effect when the `tasks` array changes (after a status update)

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Time Spent on Tasks Over Time",
      },
    },
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Dashboard</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Dashboard;
