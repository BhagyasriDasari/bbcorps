import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const res = await API.get("/events/my/events");

      const now = new Date();

      const upcomingEvents = [];
      const pastEvents = [];

      res.data.forEach(item => {
        const eventDate = new Date(item.event.date);
        if (eventDate >= now) {
          upcomingEvents.push(item);
        } else {
          pastEvents.push(item);
        }
      });

      setUpcoming(upcomingEvents);
      setPast(pastEvents);
    };

    fetchMyEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Dashboard</h2>

      {/* UPCOMING EVENTS */}
      <h3>Upcoming Events</h3>
      {upcoming.length === 0 && <p>No upcoming events</p>}

      {upcoming.map(item => (
        <div key={item._id} style={styles.card}>
          <h4>{item.event.name}</h4>
          <p>{item.event.location}</p>
          <p>Date: {new Date(item.event.date).toLocaleDateString()}</p>
        </div>
      ))}

      {/* PAST EVENTS */}
      <h3 style={{ marginTop: "30px" }}>Past Events</h3>
      {past.length === 0 && <p>No past events</p>}

      {past.map(item => (
        <div key={item._id} style={styles.card}>
          <h4>{item.event.name}</h4>
          <p>{item.event.location}</p>
          <p>Date: {new Date(item.event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px"
  }
};