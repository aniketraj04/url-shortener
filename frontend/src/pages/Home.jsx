import React, { useState } from "react";
import API from "../api";
import LinkList from "../components/LinkList";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [created, setCreated] = useState(null);
  const [error, setError] = useState("");

  const create = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/links", { originalUrl, customAlias });
      setCreated(res.data.link);
      setOriginalUrl(""); setCustomAlias("");
    } catch (err) {
      setError(err?.response?.data?.error || "Error creating link");
    }
  };

  return (
    <div className="container mx-auto container-inner max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-extrabold">Fast, private link shortener with analytics</h1>
          <p className="text-gray-400 max-w-2xl">Build short, memorable links and track clicks by country, browser and device. Perfect for sharing on resumes, social profiles and campaigns.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="panel p-5">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <p className="text-gray-300">Create short links in seconds and share anywhere.</p>
            </div>
            <div className="panel p-5">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-300">View click sources, browsers and device breakdowns.</p>
            </div>
            <div className="panel p-5">
              <h3 className="text-lg font-semibold mb-2">Custom Alias</h3>
              <p className="text-gray-300">Choose readable short slugs for important links.</p>
            </div>
            <div className="panel p-5">
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-gray-300">JWT auth, bcrypt passwords, and rate-limiting.</p>
            </div>
          </div>
        </div>

        <aside className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Create a Short Link</h2>
          <form onSubmit={create} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Original URL</label>
              <input className="input mt-2 w-full" value={originalUrl} onChange={e=>setOriginalUrl(e.target.value)} placeholder="https://example.com/page" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Custom Alias (optional)</label>
              <input className="input mt-2 w-full" value={customAlias} onChange={e=>setCustomAlias(e.target.value)} placeholder="my-project" />
            </div>
            <div>
              <button className="w-full mt-2 cta">Create</button>
            </div>
            {error && <div className="text-red-400">{error}</div>}
            {created && (
              <div className="mt-3 panel p-3 text-sm">
                <div className="text-gray-300">Short URL</div>
                <a className="text-indigo-300 break-all" href={created.shortUrl} target="_blank" rel="noreferrer">{created.shortUrl}</a>
              </div>
            )}
          </form>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Your Links</h2>
        <div className="panel p-4">
          <LinkList />
        </div>
      </section>
    </div>
  );
}
