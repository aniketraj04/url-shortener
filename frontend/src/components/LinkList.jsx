import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function LinkList() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchLinks();
    }
  }, []);

  async function fetchLinks() {
    try {
      const res = await API.get("/links");
      setLinks(res.data.links || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid token");
    }
  }

  if (error) return <div className="text-red-500">{error}</div>;
  if (!links.length) return <div>No links yet. <Link to="/login" className="text-blue-600">Login</Link> to see your links.</div>;

  return (
    <div>
      {links.map((l) => (
        <div key={l.id} className="border p-2 rounded mb-2 flex justify-between">
          <div>
            <div className="text-sm">{l.originalUrl}</div>
            <div className="text-blue-600">{window.location.origin}/{l.shortCode}</div>
          </div>
          <div className="text-sm">{l.clickCount || 0} clicks</div>
          <Link to={`/dashboard/${l.id}`} className="text-blue-600 ml-4">Analytics</Link>
        </div>
      ))}
    </div>
  );
}
