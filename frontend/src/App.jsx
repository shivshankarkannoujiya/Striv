import React from "react";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px] animate-[float_12s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px] animate-[float_14s_ease-in-out_infinite_reverse]" />

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </div>
  );
};

export default App;
