import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const companyCount = new Set(users.map((u) => u.company?.name)).size;
  const cityCount = new Set(users.map((u) => u.address?.city)).size;

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>
            <h3>Companies</h3>
            <p>{companyCount}</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>
            <h3>Cities</h3>
            <p>{cityCount}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
