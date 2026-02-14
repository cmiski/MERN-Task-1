import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useUsers } from "../hooks/useUsers";

const PAGE_SIZE = 5;

export default function Users() {
  const { users, loading, error } = useUsers();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc"); // "asc" | "desc"
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = useMemo(() => {
    return users.filter((u) =>
      (u.name + u.email).toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    return copy;
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset page if filter changes
  useEffect(() => {
  if (page > totalPages && totalPages > 0) {
    setPage(1);
  }
}, [page, totalPages]);


  return (
    <DashboardLayout>
      <h1>Users</h1>

      {/* Controls */}
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button onClick={() => setSort("asc")}>Sort A–Z</button>
        <button onClick={() => setSort("desc")}>Sort Z–A</button>
      </div>

      {/* States */}
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && sorted.length === 0 && <p>No users found.</p>}

      {/* List */}
      {!loading && !error && sorted.length > 0 && (
        <>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr
                  key={user.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedUser(user)}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: 16 }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span style={{ margin: "0 8px" }}>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Detail Modal (Simple) */}
      {selectedUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{ background: "#fff", padding: 20, minWidth: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedUser.name}</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Company: {selectedUser.company?.name}</p>
            <p>Website: {selectedUser.website}</p>

            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
