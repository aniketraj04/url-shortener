import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Dashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetch = async () => {
    try {
      const res = await API.get(`/links/${id}/analytics?range=30`);
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || "Error fetching analytics");
    }
  };

  useEffect(() => { fetch(); }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  const lineLabels = data.clicksByDay.map(r => r.date);
  const lineCounts = data.clicksByDay.map(r => r.clicks);

  const countryLabels = data.countryCounts.map(r => r.country);
  const countryCounts = data.countryCounts.map(r => r.clicks);

  const browserLabels = data.browsers.map(r => r.browser);
  const browserCounts = data.browsers.map(r => r.clicks);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Clicks (last 30 days)</h3>
          <Line data={{
            labels: lineLabels,
            datasets: [{ label: "Clicks", data: lineCounts, fill: true }]
          }} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Top Countries</h3>
          <Bar data={{
            labels: countryLabels,
            datasets: [{ label: "Clicks", data: countryCounts }]
          }} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Browsers</h3>
          <Pie data={{
            labels: browserLabels,
            datasets: [{ data: browserCounts }]
          }} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Devices</h3>
          <ul>
            {data.devices.map(d => (
              <li key={d.device} className="flex justify-between"><span>{d.device}</span><span>{d.clicks}</span></li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
