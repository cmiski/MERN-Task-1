import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header
      style={{
        height: 60,
        borderBottom: "1px solid #ddd",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>Dashboard</div>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
