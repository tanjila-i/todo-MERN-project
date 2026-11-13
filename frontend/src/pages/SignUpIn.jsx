import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignUpIn = () => {
  const { isLoading, error, signUp, login } = userAuthStore();

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handelForm = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        await signUp(name, email, password);
        toast.success("Sign Up Successfully!");
        navigate("/home");
      } else {
        await login(email, password);
        toast.success("login Successfully!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-md w-full bg-[rgba(255,255,255,0.1)] bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-2xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-10 text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={handelForm}>
          {state === "Sign Up" && (
            <Input
              icon={User}
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            icon={Mail}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 font-semibold mt-1 mb-4 ">{error}</p>
          )}

          <motion.button
            className=" text-white w-full py-2 bg-[rgba(255,255,255,0.1)] bg-opacity-50 backdrop-blur-[10px] shadow-gray-300 shadow border border-white/20 rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto " size={24} />
            ) : (
              <p> {state === "Sign Up" ? "Create Account" : "Login"}</p>
            )}
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
    </motion.div>
  );
};

export default SignUpIn;
