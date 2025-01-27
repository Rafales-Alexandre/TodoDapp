export const CONTRACT_ADDRESS = "0xf43Fdb23e1312316C3446783D79D2dCd75A776AC";

export const CONTRACT_ABI = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "inputs": [{ "internalType": "string", "name": "_description", "type": "string" }], "name": "createTask", "outputs": [], "stateMutability": "payable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "_taskId", "type": "uint256" }], "name": "deleteTask", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "getContractBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "readTask", "outputs": [{ "components": [{ "internalType": "string", "name": "description", "type": "string" }, { "internalType": "enum TodoList.TaskState", "name": "state", "type": "uint8" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }], "internalType": "struct TodoList.Task[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "_taskId", "type": "uint256" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "enum TodoList.TaskState", "name": "_state", "type": "uint8" }], "name": "updateTask", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

export const TASK_STATE = {
  0: "TODO",
  1: "DOING",
  2: "DONE",
};
