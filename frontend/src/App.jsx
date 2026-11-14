import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpIn from "./pages/SignUpIn";
import Home from "./pages/Home";
import FloatingShap from "./components/FloatingShap";

const App = () => {
  return (
    <div className="min-h-screen bg-[#020012] flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-center" />
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
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
