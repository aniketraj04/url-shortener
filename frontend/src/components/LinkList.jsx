import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function LinkList() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchLinks();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchLinks() {
    try {
      const res = await API.get("/links");
      setLinks(res.data.links || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load links");
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md mx-auto">
          {error}
        </div>
      </div>
    );
  }

  if (!links.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No links yet</h3>
        <p className="text-gray-500 mb-6">Create your first short link to get started</p>
        <Link to="/login" className="cta inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign In to View Links
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <div key={link.id} className="card group">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-400 truncate mb-1">Original URL</div>
                  <div className="text-white font-medium truncate">{link.originalUrl}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-400 mb-1">Short Link</div>
                  <div className="flex items-center space-x-2">
                    <input
                      readOnly
                      value={`${window.location.origin}/${link.shortCode}`}
                      className="input text-sm flex-1"
                      onClick={(e) => e.target.select()}
                    />
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/${link.shortCode}`)}
                      className="cta px-3 py-1 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{link.clickCount || 0}</div>
                <div className="text-xs text-gray-400">Clicks</div>
              </div>

              <Link
                to={`/dashboard/${link.id}`}
                className="cta px-4 py-2 text-sm inline-flex items-center group-hover:scale-105 transition-transform"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
