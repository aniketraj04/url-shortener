import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Signup</h2>
      <form onSubmit={submit} className="space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
