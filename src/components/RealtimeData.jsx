import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Wind, Droplets, Thermometer, CloudRain } from 'lucide-react';
import './ExpandedViews.css';

const HOURLY_DATA = [
  { time: '00:00', aqi: 45, pm25: 12 },
  { time: '04:00', aqi: 52, pm25: 15 },
  { time: '08:00', aqi: 120, pm25: 45 },
  { time: '12:00', aqi: 158, pm25: 65 },
  { time: '16:00', aqi: 140, pm25: 55 },
  { time: '20:00', aqi: 85, pm25: 25 },
  { time: '23:59', aqi: 60, pm25: 18 },
];

export default function RealtimeData() {
  return (
    <main className="dashboard expanded-view">
      <div className="view-header">
        <Activity size={28} className="text-gradient pulse-glow" />
        <h2>Real-Time Sensor Network</h2>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <Thermometer size={20} className="metric-icon" color="var(--brand-cyan)" />
          <div className="metric-info">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">24°C</span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <Droplets size={20} className="metric-icon" color="var(--brand-cyan)" />
          <div className="metric-info">
            <span className="metric-label">Humidity</span>
            <span className="metric-value">68%</span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <Wind size={20} className="metric-icon" color="var(--brand-cyan)" />
          <div className="metric-info">
            <span className="metric-label">Wind Speed</span>
            <span className="metric-value">12 km/h</span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <CloudRain size={20} className="metric-icon" color="var(--brand-cyan)" />
          <div className="metric-info">
            <span className="metric-label">Precipitation</span>
            <span className="metric-value">0 mm</span>
          </div>
        </div>
      </div>

      <div className="glass-panel main-chart-panel">
        <div className="card-header">
          <h3>24-Hour Network Averages</h3>
          <span className="active-nodes">4,200 Nodes Online</span>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HOURLY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel-hover)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }} />
              <Line yAxisId="left" type="monotone" dataKey="aqi" stroke="var(--status-poor)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-base)' }} activeDot={{ r: 6 }} name="Avg AQI" />
              <Line yAxisId="right" type="monotone" dataKey="pm25" stroke="var(--brand-cyan)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-base)' }} name="PM2.5 (µg/m³)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2-col" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-panel p-4">
          <h3 className="mb-4">Live Sensor Feed</h3>
          <div className="feed-list">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="feed-item">
                <span className="feed-time">Just now</span>
                <span className="feed-desc">Node #{8040 + i} reported SO2 levels dropping by 12%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-4">
          <h3 className="mb-4">Calibration Status</h3>
          <div className="calibration-bar">
            <span>Overall Network Accuracy</span>
            <span className="text-gradient font-bold">99.8%</span>
          </div>
        </div>
      </div>
    </main>
  );
}
