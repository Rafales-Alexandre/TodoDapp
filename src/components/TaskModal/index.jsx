import React from "react";
import Modal from "react-modal";

const TaskModal = ({
  isOpen,
  onRequestClose,
  editDescription,
  setEditDescription,
  editState,
  setEditState,
  onUpdateTask,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto"
      overlayClassName="overlay flex items-center justify-center bg-black bg-opacity-50"
    >
      <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
      <input
        type="text"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Update description"
        className="border p-2 w-full mt-2 rounded"
      />
      <select
        value={editState}
        onChange={(e) => setEditState(parseInt(e.target.value))}
        className="border p-2 w-full mt-2 rounded"
      >
        <option value={0}>TODO</option>
        <option value={1}>DOING</option>
        <option value={2}>DONE</option>
      </select>
      <div className="flex justify-between mt-4">
        <button
          onClick={onUpdateTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default TaskModal;
