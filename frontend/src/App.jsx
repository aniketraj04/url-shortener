import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex space-x-4 mb-6">
        <a href="/" className="text-blue-600">URL Shortener</a>
        <a href="/login" className="text-blue-600">Login</a>
        <a href="/signup" className="text-blue-600">Signup</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
