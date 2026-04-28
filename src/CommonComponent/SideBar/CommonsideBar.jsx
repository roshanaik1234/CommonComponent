import React, { useState } from 'react'

const NAV_ITEMS = [
  {
    section: 'Main',
    links: [
      { icon: '⊞', label: 'Dashboard', href: '#', active: true },
      { icon: '◈', label: 'Analytics', href: '#', badge: '3' },
      { icon: '◉', label: 'Projects', href: '#' },
      { icon: '◫', label: 'Messages', href: '#', badge: '12' },
    ],
  },
  {
    section: 'Manage',
    links: [
      { icon: '◷', label: 'Schedule', href: '#' },
      { icon: '◐', label: 'Team', href: '#' },
      { icon: '◳', label: 'Documents', href: '#' },
      { icon: '◬', label: 'Reports', href: '#' },
    ],
  },
  {
    section: 'Account',
    links: [
      { icon: '◎', label: 'Settings', href: '#' },
      { icon: '◌', label: 'Help', href: '#' },
    ],
  },
]

const CommonsideBar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('Dashboard')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sidebar-root {
          --bg: #0d0d0f;
          --surface: #141416;
          --border: rgba(255,255,255,0.06);
          --accent: #c8fb50;
          --accent-dim: rgba(200,251,80,0.12);
          --text-primary: #f0f0f0;
          --text-muted: #5a5a6a;
          --text-section: #3a3a4a;
          --w-open: 240px;
          --w-closed: 64px;
          --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          font-family: 'DM Mono', monospace;
          background: var(--bg);
          width: var(--w-open);
          height: 100vh;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border);
          transition: width var(--transition);
          overflow: hidden;
          position: relative;
        }

        .sidebar-root.collapsed {
          width: var(--w-closed);
        }

        /* Subtle noise texture overlay */
        .sidebar-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .sidebar-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Header */
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 16px 16px;
          border-bottom: 1px solid var(--border);
          min-height: 64px;
          flex-shrink: 0;
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }

        .logo-mark {
          width: 32px;
          height: 32px;
          background: var(--accent);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: #0d0d0f;
          letter-spacing: -0.5px;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--text-primary);
          white-space: nowrap;
          opacity: 1;
          transition: opacity var(--transition), transform var(--transition);
          letter-spacing: -0.3px;
        }

        .collapsed .logo-text {
          opacity: 0;
          transform: translateX(-8px);
          pointer-events: none;
        }

        .toggle-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: 6px;
          width: 28px;
          height: 28px;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          font-size: 12px;
        }

        .toggle-btn:hover {
          background: var(--accent-dim);
          color: var(--accent);
          border-color: rgba(200,251,80,0.3);
        }

        /* Nav */
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 12px 0;
          scrollbar-width: none;
        }

        .sidebar-nav::-webkit-scrollbar { display: none; }

        .nav-section {
          margin-bottom: 4px;
        }

        .nav-section-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-section);
          padding: 8px 20px 4px;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity var(--transition);
        }

        .collapsed .nav-section-label {
          opacity: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          height: 40px;
          text-decoration: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
          position: relative;
          border-radius: 0;
          margin: 1px 8px;
          border-radius: 8px;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent-dim);
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active {
          color: var(--accent);
        }

        .nav-link.active::before {
          opacity: 1;
          background: var(--accent-dim);
        }

        .nav-link-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          line-height: 1;
        }

        .nav-link-label {
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
          opacity: 1;
          transition: opacity var(--transition);
          flex: 1;
        }

        .collapsed .nav-link-label {
          opacity: 0;
          pointer-events: none;
        }

        .nav-badge {
          font-size: 10px;
          font-weight: 500;
          background: var(--accent);
          color: #0d0d0f;
          border-radius: 4px;
          padding: 1px 5px;
          line-height: 1.6;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          transition: opacity var(--transition);
        }

        .collapsed .nav-badge {
          opacity: 0;
          pointer-events: none;
        }

        /* Active indicator line */
        .nav-link.active::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 16px;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
          margin-left: 8px;
        }

        /* Divider */
        .sidebar-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 16px;
        }

        /* User profile footer */
        .sidebar-footer {
          border-top: 1px solid var(--border);
          padding: 12px;
          flex-shrink: 0;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          overflow: hidden;
        }

        .user-card:hover {
          background: var(--accent-dim);
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #c8fb50, #60efb0);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #0d0d0f;
          flex-shrink: 0;
        }

        .user-info {
          overflow: hidden;
          opacity: 1;
          transition: opacity var(--transition);
          flex: 1;
          min-width: 0;
        }

        .collapsed .user-info {
          opacity: 0;
          pointer-events: none;
        }

        .user-name {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 10px;
          color: var(--text-muted);
          white-space: nowrap;
          letter-spacing: 0.05em;
          margin-top: 1px;
        }

        .user-dots {
          color: var(--text-muted);
          font-size: 14px;
          opacity: 1;
          transition: opacity var(--transition);
          flex-shrink: 0;
        }

        .collapsed .user-dots {
          opacity: 0;
        }

        /* Demo wrapper */
        .demo-wrap {
          display: flex;
          height: 100vh;
          background: #08080a;
          font-family: 'DM Mono', monospace;
        }

        .demo-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2a2a3a;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="demo-wrap">
        <div className={`sidebar-root${collapsed ? ' collapsed' : ''}`}>
          <div className="sidebar-content">

            {/* Header */}
            <div className="sidebar-header">
              <div className="logo-wrap">
                <div className="logo-mark">SB</div>
                <span className="logo-text">SideBase</span>
              </div>
              <button
                className="toggle-btn"
                onClick={() => setCollapsed(c => !c)}
                title={collapsed ? 'Expand' : 'Collapse'}
              >
                {collapsed ? '→' : '←'}
              </button>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
              {NAV_ITEMS.map((section, si) => (
                <div className="nav-section" key={si}>
                  <div className="nav-section-label">{section.section}</div>
                  {section.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`nav-link${activeItem === link.label ? ' active' : ''}`}
                      title={collapsed ? link.label : undefined}
                      onClick={e => { e.preventDefault(); setActiveItem(link.label) }}
                    >
                      <span className="nav-link-icon">{link.icon}</span>
                      <span className="nav-link-label">{link.label}</span>
                      {link.badge && <span className="nav-badge">{link.badge}</span>}
                    </a>
                  ))}
                  {si < NAV_ITEMS.length - 1 && <div className="sidebar-divider" />}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
              <div className="user-card">
                <div className="avatar">AK</div>
                <div className="user-info">
                  <div className="user-name">Arjun Kumar</div>
                  <div className="user-role">Admin · Pro</div>
                </div>
                <span className="user-dots">⋯</span>
              </div>
            </div>

          </div>
        </div>

        <div className="demo-main">
          ← click arrow to collapse
        </div>
      </div>
    </>
  )
}

export default CommonsideBar