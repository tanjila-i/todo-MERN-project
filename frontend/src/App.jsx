import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpIn from "./pages/SignUpIn";
import Home from "./pages/Home";
import { userAuthStore } from "./store/authStore";
import FloatingShap from "./components/FloatingShap";

const App = () => {
  // Protect route
  const ProtectedRoute = ({ children }) => {
    const { isSigUp } = userAuthStore();

    if (!isSigUp) {
      return <Navigate to="/" replace />;
    }

    return children;
  };
  return (
    <div className="min-h-screen bg-[#020012] flex items-center justify-center relative overflow-hidden">
      <FloatingShap
        color="bg-green-100"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShap
        color="bg-emerald-100"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShap
        color="bg-lime-50"
        size="w-32 h-32"
        top="40%"
        left="50%"
        delay={2}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpIn />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
