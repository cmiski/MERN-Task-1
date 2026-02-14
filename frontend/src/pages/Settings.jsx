import DashboardLayout from "../components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";


export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile") || "{}");
    if (saved.name) setName(saved.name);
    if (saved.email) setEmail(saved.email);
  }, []);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify({ name, email }));
    alert("Profile saved");
  };
  return (
    <DashboardLayout>
      <h1>Settings</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Profile</h2>
        <div>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>Save Profile</button>
      </section>

      <section>
        <h2>Theme</h2>
        <p>Current: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </section>
    </DashboardLayout>
  );
}
