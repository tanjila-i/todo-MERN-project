import { useState } from "react";

import { LogOut, Mail, Text } from "lucide-react";
import React from "react";
import Input from "../components/Input";

const Home = () => {
  const [addTask, setAddTask] = useState("");

  const handelForm = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-white">
      <div className="flex justify-between gap-80">
        <h1 className="text-2xl font-extrabold text-gray-300">TODO</h1>
        <div className="flex items-center justify-center gap-2 cursor-pointer group relative">
          <LogOut strokeWidth={1.75} />
          <div className="absolute top-0 left-0 pt-5 text-center text-base  font-medium text-gray-100 z-10 hidden group-hover:block">
            <div className="min-w-48 flex flex-col gap-4 p-4 ">
              {" "}
              <p className="px-1 py-0.5 bg-[rgba(255,255,255,0.1)] text-sm bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-xl">
                LogOut
              </p>
              <p className="px-1 py-0.5 bg-[rgba(255,255,255,0.1)] text-sm bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-xl">
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-25">
        <form
          onSubmit={handelForm}
          className="w-full pl-4 py-2  bg-opacity-50 rounded-lg transition-all duration-200 shadow-[-2px_-2px_12px] text-white placeholder-gray-400 "
        >
          <div className="flex gap-3 justify-start">
            {" "}
            <Text className="mt-1" />
            <input
              className="flex-1 outline-none"
              type="text"
              placeholder="Enter todo text"
              value={addTask}
              onChange={(e) => setAddTask(e.target.value)}
            />
            <button type="submit" className="px-3 cursor-pointer py-1">
              Add task
            </button>
          </div>
        </form>
      </div>

      <div className=""></div>
    </div>
  );
};

export default Home;
