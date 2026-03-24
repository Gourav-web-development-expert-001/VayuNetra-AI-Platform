import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import HealthAdvisory from './components/HealthAdvisory';
import ForecastView from './components/ForecastView';
import AdminActionsView from './components/AdminActionsView';
import ReportsView from './components/ReportsView';
import GenericView from './components/GenericView';
import AuthModal from './components/AuthModal';

function App() {
  const [activeTab, setActiveTab] = useState('citymap');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [mlData, setMlData] = useState(null);
  const [activeWardGlobal, setActiveWardGlobal] = useState({ name: "Delhi Overview", aqi: 185 });
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Hook to simulate a real-time ML analysis request to the new Python backend
  useEffect(() => {
    const triggerMLAnalysis = async () => {
      try {
        const payload = {
          pm25: activeWardGlobal.aqi * 0.4,
          pm10: activeWardGlobal.aqi * 0.8,
          temp: 32.5 + (Math.random() * 5),
          humidity: 45.0 + (Math.random() * 10),
          wind: 12.0 + (Math.random() * 5),
          traffic: 85.0
        };
        const response = await fetch('http://localhost:8000/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const data = await response.json();
          setMlData(data);
        }
      } catch (err) {
        console.log("Python Backend offline. Falling back to frontend simulated models.");
        setMlData({
          aqi: activeWardGlobal.aqi,
          source: activeWardGlobal.aqi > 200 ? "Traffic Pollution" : "Mixed Source",
          health: activeWardGlobal.aqi > 200 ? "Avoid outdoor exposure completely" : "Sensitive groups should be cautious",
          recommendation: activeWardGlobal.aqi > 200 ? "Restrict heavy vehicles immediately" : "Normal monitoring",
          anomaly: "Normal",
          forecast: [
            activeWardGlobal.aqi, 
            activeWardGlobal.aqi + 15, 
            activeWardGlobal.aqi - 10, 
            activeWardGlobal.aqi + 25, 
            activeWardGlobal.aqi + 5, 
            activeWardGlobal.aqi - 20, 
            activeWardGlobal.aqi
          ]
        });
      }
    };
    
    triggerMLAnalysis();
  }, [activeWardGlobal]);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const renderContent = () => {
    switch (activeTab) {
      case 'citymap': return <Dashboard setActiveWardGlobal={setActiveWardGlobal} />;
      case 'health': return <HealthAdvisory mlData={mlData} ward={activeWardGlobal} />;
      case 'forecast': return <ForecastView mlData={mlData} ward={activeWardGlobal} />;
      case 'admin': return <AdminActionsView mlData={mlData} ward={activeWardGlobal} />;
      case 'reports': return <ReportsView mlData={mlData} ward={activeWardGlobal} />;
      default: return <GenericView tabId={activeTab} />;
    }
  };

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Header 
        toggleTheme={toggleTheme} 
        isDarkTheme={isDarkTheme} 
        currentUser={currentUser}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={() => setCurrentUser(null)}
      />
      {renderContent()}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={setCurrentUser}
        />
      )}
    </>
  );
}

export default App;
