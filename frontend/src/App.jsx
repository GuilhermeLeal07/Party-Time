import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((previous) => !previous);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`App ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
    >
      <ToastContainer />

      <Navbar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onToggleMobile={toggleMobileMenu}
        onCloseMobile={closeMobileMenu}
      />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
