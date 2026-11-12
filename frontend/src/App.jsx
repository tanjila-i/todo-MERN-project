import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpIn from "./pages/SignUpIn";
import Home from "./pages/Home";
import { userAuthStore } from "./store/authStore";

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
    <div>
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
