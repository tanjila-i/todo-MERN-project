import { useState } from "react";
import { motion } from "framer-motion";

import React from "react";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";

const SignUpIn = () => {
  const [state, setState] = useState("Sign Up");
  return (
    <div className="text-white max-w-md w-full bg-[rgba(255,255,255,0.1)] bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-2xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-10 text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <form>
          {state === "Sign Up" && (
            <Input icon={User} type="text" placeholder="Enter Name" />
          )}

          <Input icon={Mail} type="email" placeholder="Enter Email" />
          <Input icon={Lock} type="password" placeholder="Enter Password" />
          <motion.button
            className=" text-white w-full py-2 bg-[rgba(255,255,255,0.1)] bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </motion.button>
        </form>
        <div className="mt-10 text-center">
          {" "}
          {state === "Sign Up" ? (
            <p className="text-gray-200">
              Already have a account?
              <span
                onClick={() => setState("Login")}
                className="text-gray-400 underline cursor-pointer "
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-200">
              Create an new account?
              <span
                onClick={() => setState("Sign Up")}
                className="text-gray-400 underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpIn;
