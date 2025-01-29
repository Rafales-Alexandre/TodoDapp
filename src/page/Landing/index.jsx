import { useState,useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/constants";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";
import TaskModal from "../../components/TaskModal";
import useContract from "../../hooks/useContract";

const App = () => {
  const { connectWallet,disconnectWallet, contract, provider, signer } = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editState, setEditState] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (signer) {
      fetchTasks(); 
    }
  }, [signer]);

  const handleConnectWallet = async () => {
    try {
      const { address: connectedAddress, signer: connectedSigner } = await connectWallet();
      setAddress(connectedAddress);

      const ethBalance = await connectedSigner.getBalance();
      setBalance(ethers.utils.formatEther(ethBalance));

      await fetchTasks();
    } catch (err) {
      setError("Failed to connect wallet: " + err.message);
    }
  };
  const handleDisconnectWallet = () => {
    setAddress("");
    setBalance("");
    setTasks([]);
    setError("");

    disconnectWallet();
  };

  const fetchTasks = async () => {
    try {
      if (!contract) return; 
      const fetchedTasks = await contract.readTask(); 
      setTasks(fetchedTasks); 
    } catch (err) {
      setError("Failed to fetch tasks: " + err.message);
    }
  };
  

  const handleAddTask = async () => {
    try {
      if (!newTask) {
        setError("Task description cannot be empty.");
        return;
      }
      const tx = await contract.createTask(newTask, { value: ethers.utils.parseEther("0.01") });
      await tx.wait();
      fetchTasks();
      setNewTask("");
    } catch (err) {
      setError("Failed to add task: " + err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const tx = await contract.deleteTask(taskId);
      await tx.wait();
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task: " + err.message);
    }
  };

  const handleEditTask = (taskId, description, state) => {
    setEditTaskId(taskId);
    setEditDescription(description);
    setEditState(state);
    setModalIsOpen(true);
  };

  const handleUpdateTask = async () => {
    try {
      if (!editDescription) {
        setError("Task description cannot be empty.");
        return;
      }
  
      const tx = await contract.updateTask(editTaskId, editDescription, editState);
      await tx.wait(); 
      await fetchTasks(); 
      setEditTaskId(null);
      setEditDescription("");
      setEditState(0);
      setModalIsOpen(false);
    } catch (err) {
      setError("Failed to update task: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List DApp</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!signer ? (
          <div className="text-center">
            <button
              onClick={handleConnectWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-center text-gray-700">
                  Connected Address: <span className="font-mono">{address}</span>
                </p>
                <p className="text-center text-gray-700">Balance: {balance} ETH</p>
              </div>
              {address && (
                <button
                  onClick={handleDisconnectWallet}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Disconnect
                </button>
              )}
            </div>

            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
            <TaskForm newTask={newTask} onChange={setNewTask} onAddTask={handleAddTask} />

            <TaskModal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              editState={editState}
              setEditState={setEditState}
              onUpdateTask={handleUpdateTask}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
