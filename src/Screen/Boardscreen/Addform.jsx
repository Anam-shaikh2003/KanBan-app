// App.jsx or Dashboard.jsx
import React, { useState } from "react";
import Taskform from './Taskform'

const Addform = () => {
  const [tasks, setTasks] = useState([]);

  const handleNewTask = (task) => {
    console.log("✅ Task Created:", task);
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div>
      <Taskform onSubmit={handleNewTask} />
    </div>
  );
};

export default Addform;
