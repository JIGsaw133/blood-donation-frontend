// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import HomePage from './Pages/Home';
import Donors from './Pages/Donors';
import BloodInventory from './Pages/BloodInventory';
import Donations from './Pages/Donations';
import Transfusions from './Pages/Transfusions';
import Events from './Pages/Events';
import HealthcareRequests from './Pages/HealthcareRequests';
import './App.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 Blood Donation System. Powered by Care & Innovation.</p>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-title">Blood Donation System</header>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/inventory" element={<BloodInventory />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/transfusions" element={<Transfusions />} />
            <Route path="/events" element={<Events />} />
            <Route path="/requests" element={<HealthcareRequests />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
