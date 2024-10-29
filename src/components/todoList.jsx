import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, deleteAllTasks, deleteByID, getAllTasks ,updateTask } from "../states/slices/taskThunk";
import { removeTask } from "../states/slices/task.Slice";
import Navbar from "./Navbar";

export default function TodoList() {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { tasks } = useSelector((state) => state.task);
  
  const getTask = (event) => {
    setTask(event.target.value);
  };
  
  const handleAddTask = async () => {
    await dispatch(createTask({ addTask: task }));
    setTask("");
    dispatch(getAllTasks());
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTasks()); 
  };

  const handleDeleteByID = (id) => {
    dispatch(deleteByID(id));
    dispatch(removeTask(id));
  };

  const handleEditClick = (task) => {
    setUpdatedTask(task.task); 
    setEditingTaskId(task._id);
  };

  const handleUpdateTask = async () => {
    if (editingTaskId) {
      await dispatch(updateTask({ id: editingTaskId, editedTask:updatedTask })); 
      dispatch(getAllTasks());
      setEditingTaskId(null);
      updatedTask("");
    }
  };
   const handleCancelClick = () =>{
    setEditingTaskId(null);
   }

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <>
    
    <Navbar/>

    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">To-Do List</h1>

      <div className="w-full max-w-md">
        <div className="flex">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="Enter a new task..."
            value={task}
            onChange={getTask}
          />
          <button onClick={handleAddTask} className="ml-1 px-5 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 transition-colors">
            Add
          </button>
        </div>

        <div className="mt-4">
          <button onClick={handleDeleteAll} className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Delete All
          </button>
        </div>

        <ul className="mt-6 space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md"
            >
              {editingTaskId === task._id ? ( 
                <>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  autoFocus
                />
                
                </>
              ) : (
                <span className="text-gray-800">{task.task}</span>
              )}
                {editingTaskId === task._id ?(
                    <div className="flex gap-3 ml-2">
                    <button onClick={handleCancelClick} className="px-3 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors">
                      Cancel 
                    </button>
                    <button onClick={() => handleUpdateTask()} className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Save 
                    </button>
                    </div>
                    ):(

                <div className="flex gap-3">
               
                <button onClick={() => handleEditClick(task)} className="px-3 py-1 bg-green-500 text-white rounded-lg hover:green-600 transition-colors">
                  Edit 
                </button>
                <button onClick={() => handleDeleteByID(task._id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Delete 
                </button>
              </div>
                    )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
