import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onToggleMobile,
  onCloseMobile,
}) => {
  return (
    <>
      <header className="mobile-header">
        <h2>PJ Party Time</h2>

        <button
          className="mobile-menu-button"
          onClick={onToggleMobile}
          aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      <button
        className={`sidebar-backdrop ${isMobileOpen ? 'active' : ''}`}
        onClick={onCloseMobile}
        aria-label="Fechar menu"
        tabIndex={isMobileOpen ? 0 : -1}
      />

      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-brand">
            {isCollapsed ? 'PJ' : 'PJ Party Time'}
          </h2>

          <button
            className="sidebar-toggle"
            onClick={onToggleCollapse}
            aria-label={
              isCollapsed ? 'Expandir menu' : 'Recolher menu'
            }
            title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M9 4v16" />
            </svg>
          </button>
        </div>

        <div className="sidebar-section">
          {!isCollapsed && (
            <span className="sidebar-label">MENU PRINCIPAL</span>
          )}

          <nav className="sidebar-navigation">
            <NavLink
              to="/"
              end
              title="Minhas Festas"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>

              {!isCollapsed && <span>Minhas Festas</span>}
            </NavLink>

            <NavLink
              to="/party/new"
              title="Criar Festa"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v8M8 12h8" />
              </svg>

              {!isCollapsed && <span>Criar Festa</span>}
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          {!isCollapsed && (
            <span>Organize seus momentos especiais.</span>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
