import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(){
  return (
    <aside className="w-64 min-h-screen p-6 sidebar hidden md:block">
      <div className="mb-8">
        <div className="text-xs text-gray-400 uppercase mb-3">For Users</div>
        <nav className="space-y-1">
          <Link to="/" className="block py-3 pl-3 text-white font-semibold panel">Features</Link>
          <a className="block py-2 pl-3 text-gray-300">How Stoofers Work ?</a>
          <a className="block py-2 pl-3 text-gray-300">What Students Say ?</a>
        </nav>
      </div>

      <div className="mt-6">
        <div className="text-xs text-gray-400 uppercase mb-3">For Business</div>
        <nav>
          <a className="block py-3 pl-3 text-gray-300">Partner with Stoofers</a>
        </nav>
      </div>
    </aside>
  );
}
