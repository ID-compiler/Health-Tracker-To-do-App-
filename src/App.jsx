import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { getData, saveData } from "./storage";

const key = 'DATA';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(getData(key) || []);
  const [showFinished, setShowFinished] = useState(false);

  const handleAdd = () => {
    if (task.trim().length === 0) return;

    const newTasks = [
      ...tasks,
      { id: uuidv4(), task: task.trim(), isCompleted: false },
    ];

    setTasks(newTasks);
    saveData(key, newTasks);
    setTask("");
  };

  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTasks(updatedTasks);
    saveData(key, updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
    saveData(key, updatedTasks);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((item) => item.id === id);
    if (!taskToEdit) return;

    const newTask = prompt("Edit your task", taskToEdit.task);
    if (newTask && newTask.trim() !== "") {
      const updatedTasks = tasks.map((item) =>
        item.id === id ? { ...item, task: newTask.trim() } : item
      );
      setTasks(updatedTasks);
      saveData(key, updatedTasks);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-green-200 min-h-[80vh] font-bold my-5 mx-auto p-5 rounded-xl max-w-3xl">
        <h1 className="flex justify-center py-5">
          Health-tracker: Tracks yourself here
        </h1>

        <div className="totask mb-6">
          <h2 className="text-lg font-bold mb-2">Add a task</h2>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="px-5 py-2 mx-8 rounded-xl bg-green-500 text-white"
          >
            Add
          </button>

          {/* Show Finished Toggle */}
          <label className="flex items-center space-x-2 mt-4 mb-2">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
            />
            <span className="font-medium">Show Only Finished</span>
          </label>

          <h2 className="text-xl font-bold mt-6">Your Tasks</h2>

          <div className="tasks space-y-2">
            {tasks.filter(item => showFinished ? item.isCompleted : true).length === 0 && (
              <div>No Tasks to display</div>
            )}

            {tasks
              .filter(item => showFinished ? item.isCompleted : true)
              .map((item) => (
                <div
                  key={item.id}
                  className="task flex justify-between shadow items-center p-2 rounded bg-white"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => toggleCompleted(item.id)}
                    />
                    <span
                      className={`text-gray-800 ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.task}
                    </span>
                  </div>

                  <div className="buttons space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
