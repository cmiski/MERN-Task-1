import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <aside style={{ width: 200, borderRight: "1px solid #ddd", padding: 16 }}>
      <h2>SaaS Demo</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/users" style={linkStyle}>Users</NavLink>
          </li>
          <li>
            <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
