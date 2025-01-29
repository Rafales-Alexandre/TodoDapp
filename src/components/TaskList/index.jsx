import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getTaskStateLabel = (state) => {
    switch (state) {
      case 0:
        return "TODO";
      case 1:
        return "DOING";
      case 2:
        return "DONE";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between border p-2 my-2 rounded"
          >
            <div>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>State:</strong> {getTaskStateLabel(task.state)}</p>
              <p><strong>Creation Date:</strong> {new Date(task.creationDate * 1000).toLocaleString()}</p>
            </div>
            <div>
              <button
                onClick={() => onEdit(index, task.description, task.state)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
