import React from "react";

const TaskForm = ({ newTask, onChange, onAddTask }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={newTask}
        onChange={(e) => onChange(e.target.value)}
        placeholder="New task description"
        className="border p-2 w-full mt-2 rounded"
      />
      <button
        onClick={onAddTask}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
