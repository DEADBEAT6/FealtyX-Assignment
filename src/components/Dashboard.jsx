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
  const { tasks } = useTasks();
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

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const timeData = {};

    tasks.forEach((task) => {
      if (task.status === "Closed" && task.timeSpent > 0) {
        const date = new Date(task.lastStartTime).toLocaleDateString();

        if (!timeData[date]) {
          timeData[date] = 0;
        }
        timeData[date] += task.timeSpent;
      }
    });

    const dates = Object.keys(timeData).sort();
    const timeSpentOnTasks = dates.map((date) => timeData[date]);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Total Time Spent on Tasks (in hours)",
          data: timeSpentOnTasks.map((time) => time / (1000 * 60 * 60)),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    });
  }, [tasks]);

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
