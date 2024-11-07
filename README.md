# 🐞 Bug/Task Tracker App

A simple **Task/bug tracker** app built using **React.js** and **Context API**. Track your tasks, time spent, and visualize progress with a trendline graph! 📊

---

## 🚀 Features:
- **👤 User Authentication**: Login with a simple username.
- **📝 Task Management**: Create, assign, edit, and delete tasks.
- **⏱️ Time Tracking**: Track time spent on each task.
- **📈 Trendline Graph**: View total time spent on tasks each day.
- **💾 localStorage**: Tasks persist across page refreshes.

---

## 🔧 Technologies Used:
- **React.js** (Frontend)
- **Context API** (State management)
- **localStorage** (Data persistence)
- **Tailwind CSS** (Styling)
- **Chart.js** (Graph visualization)

---

## 🏃‍♂️ Setup & Run Locally

### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/your-username/task-tracker-app.git
cd task-tracker-app

### 2️⃣ Install Dependencies:
```bash
npm install
```

### 3️⃣ Start the Development Server:
```bash
npm start
```

## 🛠️ Features in Action:

### 1. Login:
- Log in with a simple username (e.g., "user1", "user2").

### 2. Dashboard:
- View tasks assigned to you or created by you.
- Tasks can be marked as **Open**, **In Progress**, or **Closed**.

### 3. Timer ⏰:
- Start/Stop the timer for each task.
- Time is displayed in **hours** on the task card and graph.

### 4. Trendline Graph 📊:
- View total time spent on tasks that are marked as **Closed**.

---

## 📝 Important Notes:

- **localStorage**: Your tasks are stored in the browser's `localStorage`. Refreshing or reopening the app will keep the tasks intact.
- **Graph Update**: The graph only updates when tasks are marked as **Closed**.

---

## ⚠️ Known Issues:
- **No sync across devices**: Tasks are saved only in the browser.
- **Basic authentication**: Just a simple username, no password or security measures.

---

## 💡 Future Improvements:
- **🔑 Persistent Authentication**: Add JWT/OAuth for real authentication.
- **🔄 Syncing Across Devices**: Sync tasks via a backend server.
- **📊 Enhanced Graphs**: Add more graph types (e.g., pie charts for task breakdown).
- **📱 Mobile Responsiveness**: Improve mobile UX.

---

## 🎉 Conclusion:
This app is great for simple task management, time tracking, and data visualization. Extend it as needed with new features or integrations!
```
