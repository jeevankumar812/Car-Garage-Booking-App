import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [editingService, setEditingService] = useState(null);
  const [busy, setBusy] = useState(false);

  // 👤 Get user
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const isAdmin =
    Boolean(user?.isAdmin) ||
    String(user?.role || "").toLowerCase() === "admin";

  // 📥 Fetch Bookings
  const fetchBookings = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/bookings",
    {
      headers: {
        Authorization: localStorage.getItem("token")   // ✅ ADD THIS
      }
    }
  );

  setBookings(res.data);
};

  // 📥 Fetch Services
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log("Error fetching services");
    }
  };

  // 🔄 Load data
  useEffect(() => {
    if (isAdmin) {
      fetchServices();
      fetchBookings();
    }
  }, [isAdmin]);

  // ➕ Add Service
  const handleAddService = async () => {
    if (!newService.name || !newService.price) {
      alert("Name & Price required");
      return;
    }

    try {
      setBusy(true);

      await axios.post(
        "http://localhost:5000/api/services",
        newService,
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      );

      alert("Service Added");
      setNewService({ name: "", price: "", description: "" });
      fetchServices();

    } catch {
      alert("Failed to add service");
    } finally {
      setBusy(false);
    }
  };

  // ✏️ Update Service
  const handleUpdateService = async () => {
    try {
      setBusy(true);

      await axios.put(
        `http://localhost:5000/api/services/${editingService._id}`,
        editingService,
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      );

      alert("Service Updated");
      setEditingService(null);
      fetchServices();

    } catch {
      alert("Update failed");
    } finally {
      setBusy(false);
    }
  };

  // ❌ Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      setBusy(true);

      await axios.delete(
        `http://localhost:5000/api/services/${id}`,
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      );

      alert("Service Deleted");
      fetchServices();

    } catch {
      alert("Delete failed");
    } finally {
      setBusy(false);
    }
  };

  // 🔄 Update Booking Status
 const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5000/api/bookings/${id}`,
      { status },   // ✅ IMPORTANT
      {
        headers: {
          Authorization: localStorage.getItem("token") // ✅ MUST
        }
      }
    );

    alert("Status Updated");
    fetchBookings(); // ✅ refresh

  } catch (err) {
    console.log(err);
    alert("Update failed");
  }
};

  // ❌ Not admin
  if (!isAdmin) {
    return <div className="container">Access Denied</div>;
  }

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <div className="adminHeader">
          <h2 className="sectionTitle">Admin Dashboard</h2>
          <p className="muted">Manage services & bookings</p>
        </div>

        {/* ADD SERVICE */}
        <div className="card">
          <div className="cardPad adminForm">

            <input
              className="control"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />

            <input
              className="control"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />

            <input
              className="control"
              placeholder="Description"
              value={newService.description}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  description: e.target.value
                })
              }
            />

            <button className="btn btnPrimary" onClick={handleAddService}>
              Add Service
            </button>
          </div>
        </div>

        {/* SERVICES LIST */}
        <div className="servicesGrid" style={{ marginTop: 20 }}>
          {services.map((s) => (
            <div key={s._id} className="adminServiceCard">

              {editingService?._id === s._id ? (
                <>
                  <input
                    className="control"
                    value={editingService.name}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        name: e.target.value
                      })
                    }
                  />

                  <input
                    className="control"
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: e.target.value
                      })
                    }
                    style={{ marginTop: 8 }}
                  />

                  <input
                    className="control"
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        description: e.target.value
                      })
                    }
                    style={{ marginTop: 8 }}
                  />

                  <div className="adminActions">
                    <button className="btn btnPrimary" onClick={handleUpdateService}>
                      Save
                    </button>
                    <button className="btn" onClick={() => setEditingService(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="adminServiceTitle">{s.name}</div>
                  <div className="adminPrice">₹{s.price}</div>
                  <p className="muted">{s.description}</p>

                  <div className="adminActions">
                    <button className="btn" onClick={() => setEditingService(s)}>
                      Edit
                    </button>
                    <button
                      className="btn btnDanger"
                      onClick={() => deleteService(s._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>

        {/* BOOKINGS SECTION */}
        <div style={{ marginTop: "40px" }}>
  <h2 className="sectionTitle">All Bookings</h2>

  {bookings.length === 0 ? (
    <p>No bookings found</p>
  ) : (
    bookings.map((b) => (
      <div
        key={b._id}
        className="card"
        style={{ marginTop: "10px", padding: "15px" }}
      >
        <p><strong>User:</strong> {b.userId?.name || "No User"}</p>
        <p><strong>Email:</strong> {b.userId?.email || "No Email"}</p>
        <p><strong>Service:</strong> {b.serviceId?.name || "No Service"}</p>
        <p><strong>Status:</strong> {b.status}</p>

       <select
  value={b.status}
  onChange={(e) => updateStatus(b._id, e.target.value)}
>
  <option value="Pending">Pending</option>
  <option value="Completed">Completed</option>
  <option value="InProgress">InProgress</option>

</select>
      </div>
    ))
  )}
</div>

      </div>
    </div>
  );
}

export default Admin;