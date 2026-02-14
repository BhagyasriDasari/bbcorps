import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Events() {
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
  const fetchEvents = async () => {
    const res = await API.get("/events", {
      params: {
        search,
        location,
        category
      }
    });
    setEvents(res.data);
  };

  fetchEvents();
}, [search, location, category]);


  const fetchEvents = async () => {
    const res = await API.get("/events", {
      params: {
        search,
        location,
        category
      }
    });
    setEvents(res.data);
  };

  const registerEvent = async (id) => {
    await API.post(`/events/${id}/register`);
    alert("Registered successfully");
    fetchEvents(); // refresh capacity
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Discover Events</h2>

      {/* SEARCH & FILTERS */}
      <div style={styles.filters}>
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Chennai">Chennai</option>
          <option value="Delhi">Delhi</option>
          <option value="Pune">Pune</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Security">Security</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {!user && (
        <p>
          <Link to="/login">Login</Link> to register for events
        </p>
      )}

      {/* EVENTS LIST */}
      {events.length === 0 && <p>No events found</p>}

      {events.map(event => (
        <div key={event._id} style={styles.card}>
          <h3>{event.name}</h3>
          <p>{event.location} | {event.category}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Seats Available: {event.capacity}</p>

          {user && event.capacity > 0 && (
            <button onClick={() => registerEvent(event._id)}>
              Register
            </button>
          )}

          {event.capacity === 0 && (
            <p style={{ color: "red" }}>Sold Out</p>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px"
  }
};
