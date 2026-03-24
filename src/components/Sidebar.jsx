import React from 'react';
import { LayoutDashboard, Map, HeartPulse, LineChart, ShieldAlert, FileText, Settings } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'citymap', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'health', icon: <HeartPulse size={20} />, label: 'Health Advisory' },
    { id: 'forecast', icon: <LineChart size={20} />, label: 'Forecast' },
    { id: 'admin', icon: <ShieldAlert size={20} />, label: 'Admin Actions' },
    { id: 'reports', icon: <FileText size={20} />, label: 'Reports' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="brand">
        <div className="brand-logo pulse-glow"></div>
        <h1 className="brand-text text-gradient">VayuNetra</h1>
      </div>
      
      <nav className="nav-links">
        {tabs.map(tab => (
          <a
            key={tab.id}
            href="#"
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a 
          href="#" 
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}
        >
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
}
