import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    timeSlot: "",
    description: "",
    serviceId: ""
  });

  // ✅ FORMAT TIME FOR DISPLAY
  const formatTimeSlot = (slot) => {
    const map = {
      "8-10": "8 AM - 10 AM",
      "10-12": "10 AM - 12 PM",
      "12-2": "12 PM - 2 PM",
      "2-4": "2 PM - 4 PM",
      "4-6": "4 PM - 6 PM",
      "6-8": "6 PM - 8 PM"
    };
    return map[slot] || slot;
  };

  // 🔥 FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 FETCH SERVICES
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  // ❌ DELETE
  const deleteBooking = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      alert("Deleted successfully");
      fetchBookings();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✏️ START EDIT
  const startEdit = (b) => {
    setEditingId(b._id);
    setEditData({
      date: b.date || "",
      timeSlot: b.timeSlot || "",
      description: b.description || "",
      serviceId: b.serviceId?._id || ""
    });
  };

  // 💾 UPDATE
  const updateBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        editData,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Updated successfully");
      setEditingId(null);
      await fetchBookings();

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="sectionHeader">
          <h2 className="sectionTitle">My Bookings</h2>
          <span className="muted">{bookings.length} total</span>
        </div>

        {bookings.length === 0 ? (
          <div className="emptyState">No bookings found.</div>
        ) : (
          <div className="grid">

            {bookings.map((b) => (
              <div key={b._id} className="card">
                <div className="cardPad">

                  {/* HEADER */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 800 }}>
                      {b.serviceId?.name || "Service"}
                    </div>
                    <span className="badge">{b.status || "Pending"}</span>
                  </div>

                  {/* ✏️ EDIT MODE */}
                  {editingId === b._id ? (
                    <div style={{ marginTop: 10 }}>

                      {/* SERVICE */}
                      <select
                        className="control"
                        value={editData.serviceId}
                        onChange={(e) =>
                          setEditData({ ...editData, serviceId: e.target.value })
                        }
                      >
                        <option value="">Select Service</option>
                        {services.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name} - ₹{s.price}
                          </option>
                        ))}
                      </select>

                      {/* DATE */}
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) =>
                          setEditData({ ...editData, date: e.target.value })
                        }
                        className="control"
                      />

                      {/* TIME SLOT */}
                      <select
                        className="control"
                        value={editData.timeSlot || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, timeSlot: e.target.value })
                        }
                      >
                        <option value="">Select Time</option>
                        <option value="8-10">8 AM - 10 AM</option>
                        <option value="10-12">10 AM - 12 PM</option>
                        <option value="12-2">12 PM - 2 PM</option>
                        <option value="2-4">2 PM - 4 PM</option>
                        <option value="4-6">4 PM - 6 PM</option>
                        <option value="6-8">6 PM - 8 PM</option>
                      </select>

                      {/* DESCRIPTION */}
                      <input
                        type="text"
                        placeholder="Description"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({ ...editData, description: e.target.value })
                        }
                        className="control"
                      />

                      <button
                        className="btn btnPrimary"
                        onClick={() => updateBooking(b._id)}
                      >
                        Save
                      </button>

                      <button
                        className="btn btnDanger"
                        onClick={() => setEditingId(null)}
                        style={{ marginLeft: 10 }}
                      >
                        Cancel
                      </button>

                    </div>
                  ) : (
                    <>
                      {/* VIEW MODE */}
                      <div className="muted" style={{ marginTop: 10 }}>
                        <p><strong>User:</strong> {b.userId?.name}</p>
                        <p><strong>Email:</strong> {b.userId?.email}</p>
                        <p><strong>Date:</strong> {b.date}</p>
                        <p><strong>Time:</strong> {formatTimeSlot(b.timeSlot)}</p>
                        <p><strong>Note:</strong> {b.description}</p>
                      </div>

                      {/* ACTIONS */}
                      <div style={{ marginTop: 15 }}>
                        <button
                          className="btn"
                          onClick={() => startEdit(b)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btnDanger"
                          onClick={() => deleteBooking(b._id)}
                          style={{ marginLeft: 10 }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;