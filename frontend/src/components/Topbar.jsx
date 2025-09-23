import React from "react";

export default function Topbar(){
  return (
    <header className="h-16 flex items-center justify-between px-8" style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
      <div className="flex items-center space-x-6">
        <a className="brand text-white text-xl">STOOFERS</a>
      </div>
      <div className="flex items-center space-x-4">
        <a className="text-sm text-gray-300 hidden md:inline">CONTACT US</a>
      </div>
    </header>
  );
}
