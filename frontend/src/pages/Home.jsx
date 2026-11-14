import { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Circle,
  Loader,
  LogOut,
  PenSquare,
  Text,
  Trash,
  X,
} from "lucide-react";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { todoStore } from "../store/todoStore";
import { motion } from "framer-motion";

const Home = () => {
  // All use States
  const [addTask, setAddTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // navigation
  const navigate = useNavigate();

  // user and task store
  const { logout } = userAuthStore();
  const { isLoading, createTodo, todos, allTodos, deleteTodo, updateTodo } =
    todoStore();

  // Logout function
  const handeolLogout = () => {
    try {
      logout();
      toast.success("logout Sucessfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout Fail");
      console.log(error);
    }
  };

  // handelForm funtion
  const handelForm = async (e) => {
    e.preventDefault();

    try {
      await createTodo(addTask);
      await allTodos();
      toast.success("Task Created");
      setAddTask("");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.message);
    }
  };

  // task delete function
  const handelDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Task Deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  // Start editing when PenSquare is clicked
  const startEdit = (todo) => {
    setEditingId(todo._id || todo.id);
    setEditText(todo.text);
  };
  // Save updated task to Zustand & backend
  const handelUpdate = async (id) => {
    if (!editText.trim()) {
      return toast.error("Task cannot be empty");
    }
    try {
      await updateTodo(id, { text: editText });
      setEditingId(null);
      toast.success("Task Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleToggleComplete = async (todo) => {
    const id = todo._id || todo.id;

    try {
      await updateTodo(id, { completed: !todo.completed });
      toast.success(
        todo.completed ? "Task marked incomplete" : "Task completed!",
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // Get all the task
  useEffect(() => {
    allTodos();
  }, [allTodos]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white mb-20"
    >
      <div className="flex justify-between gap-80">
        <h1 className="text-2xl font-extrabold text-gray-300">TODO</h1>
        <div className="flex items-center justify-center gap-2 cursor-pointer group relative">
          <LogOut strokeWidth={1.75} />
          <div className="absolute top-0 left-0 pt-5 text-center text-base  font-medium text-gray-100 z-10 hidden group-hover:block">
            <div className="min-w-48 flex flex-col gap-4 p-4 ">
              <p
                onClick={handeolLogout}
                className="px-1 py-0.5 bg-[rgba(255,255,255,0.1)] text-sm bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-xl"
              >
                LogOut
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15">
        <form
          onSubmit={handelForm}
          className="w-full pl-4 py-2  bg-opacity-50 rounded-lg transition-all duration-200 shadow-[-2px_-2px_12px] text-white placeholder-gray-400 "
        >
          <div className="flex gap-3 justify-start">
            <Text className="mt-1" />
            <input
              className="flex-1 outline-none"
              type="text"
              placeholder="Enter your task"
              value={addTask}
              onChange={(e) => setAddTask(e.target.value)}
            />
            <button type="submit" className="px-3 cursor-pointer py-1">
              {isLoading ? <Loader /> : "Add task"}
            </button>
          </div>
        </form>
      </div>
      {!todos?.length ? (
        <div className="text-center mt-30 text-3xl font-bold text-gray-400">
          Add your first task!
        </div>
      ) : (
        <div>
          {todos.map((todo, index) => {
            const id = todo._id || todo.id;
            const isEditing = editingId === id;

            return (
              <div
                key={index}
                className="text-white flex justify-between items-center mt-7"
              >
                {isEditing ? (
                  <div className="flex flex-1 items-center gap-2 mr-3">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handelUpdate(id)}
                      className="flex-1 bg-white/10 px-3 py-1 rounded outline-none text-white border border-white/20"
                      autoFocus
                    />
                    <Check
                      size={20}
                      className="cursor-pointer text-green-400"
                      onClick={() => handelUpdate(id)}
                    />
                    <X
                      size={20}
                      className="cursor-pointer text-gray-400"
                      onClick={() => setEditingId(null)}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-center">
                      {todo.text}
                    </h1>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleComplete(todo)}
                        className="mt-1 cursor-pointer"
                      >
                        {todo.completed ? (
                          <CheckCircle2 size={20} className="text-green-400" />
                        ) : (
                          <Circle
                            size={20}
                            className="text-gray-300 hover:text-green-400"
                          />
                        )}
                      </button>
                      <PenSquare
                        size={20}
                        className="mt-1 cursor-pointer"
                        onClick={() => startEdit(todo)}
                      />
                      <Trash
                        size={20}
                        className="mt-1 cursor-pointer"
                        onClick={() => handelDelete(id)}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Home;
