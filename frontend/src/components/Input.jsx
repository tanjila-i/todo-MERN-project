import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-white" />
      </div>
      <input
        className="w-full pl-10 pr-3 py-2 px-8 bg-opacity-50 rounded-lg transition-all duration-200 shadow-[-2px_-2px_12px] text-white placeholder-gray-400 "
        {...props}
      />
    </div>
  );
};

export default Input;
// className="rounded-xl bg-[#e2e8f0] px-8 py-3 font-medium text-slate-700 transition-all duration-200 shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#94a3b8] hover:shadow-[inset_-10px_-10px_18px_#ffffff,inset_10px_10px_18px_#94a3b8] active:shadow-[inset_-10px_-10px_18px_#ffffff,inset_10px_10px_18px_#94a3b8]"
