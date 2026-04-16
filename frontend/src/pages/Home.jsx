import React, { useState } from "react";
import API from "../api";
import LinkList from "../components/LinkList";
import { Link } from "react-router-dom";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [created, setCreated] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const create = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await API.post("/links", { originalUrl, customAlias });
      setCreated(res.data.link);
      setOriginalUrl("");
      setCustomAlias("");
    } catch (err) {
      setError(err?.response?.data?.error || "Error creating link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Shorten URLs with
              <br />
              <span className="text-white">Style</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform long URLs into sleek, trackable links. Get detailed analytics,
              custom aliases, and enterprise-grade security—all in one beautiful interface.
            </p>
          </div>

          {/* Main URL Shortener Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="panel p-8 animate-pulse-glow">
              <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Short Link</h2>
              <form onSubmit={create} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Original URL
                    </label>
                    <input
                      type="url"
                      className="input w-full"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      placeholder="https://example.com/very-long-url"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom Alias <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      className="input w-full"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      placeholder="my-awesome-link"
                      pattern="^[a-zA-Z0-9_-]+$"
                      title="Only letters, numbers, hyphens, and underscores allowed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="cta w-full text-lg py-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    "Shorten URL"
                  )}
                </button>

                {error && (
                  <div className="text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    {error}
                  </div>
                )}

                {created && (
                  <div className="panel p-4 bg-green-500/10 border-green-500/20">
                    <div className="text-green-400 font-medium mb-2">✅ Link Created Successfully!</div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-300">Your short URL:</div>
                      <div className="flex items-center space-x-2">
                        <input
                          readOnly
                          value={created.shortUrl}
                          className="input flex-1 text-sm"
                          onClick={(e) => e.target.select()}
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(created.shortUrl)}
                          className="cta px-4 py-2 text-sm"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">
                        Original: {created.originalUrl}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose Our Shortener?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built for the modern web with cutting-edge features and stunning design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Create short links in milliseconds with our optimized infrastructure.</p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-400">Track clicks by location, device, browser, and referrer in real-time.</p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Aliases</h3>
              <p className="text-gray-400">Create memorable, branded short links that reflect your identity.</p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-400">Bank-level encryption, JWT authentication, and rate limiting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Your Short Links</h2>
            <p className="text-xl text-gray-300">
              Manage and track all your shortened URLs in one place.
            </p>
          </div>

          <div className="panel p-8">
            <LinkList />
          </div>

          <div className="text-center mt-8">
            <Link to="/login" className="cta inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In for Full Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
