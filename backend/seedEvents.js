const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const events = [
  {
    name: "BellCorp Tech Conference",
    organizer: "BellCorp",
    location: "Hyderabad",
    date: new Date("2026-03-01T10:00:00"),
    description: "Annual technology conference",
    capacity: 50,
    category: "Technology"
  },
  {
    name: "Startup Pitch Day",
    organizer: "Startup India",
    location: "Bangalore",
    date: new Date("2026-03-05T09:00:00"),
    description: "Pitch your startup ideas",
    capacity: 40,
    category: "Business"
  },
  {
    name: "AI & ML Workshop",
    organizer: "OpenAI Community",
    location: "Chennai",
    date: new Date("2026-03-10T11:00:00"),
    description: "Hands-on AI workshop",
    capacity: 30,
    category: "Technology"
  },
  {
    name: "Cyber Security Summit",
    organizer: "CyberSafe",
    location: "Pune",
    date: new Date("2026-03-12T10:00:00"),
    description: "Security trends and best practices",
    capacity: 60,
    category: "Security"
  },
  {
    name: "Digital Marketing Bootcamp",
    organizer: "MarketPro",
    location: "Mumbai",
    date: new Date("2026-03-15T09:30:00"),
    description: "Learn modern digital marketing",
    capacity: 45,
    category: "Marketing"
  },
  {
    name: "Data Science Meetup",
    organizer: "DS India",
    location: "Hyderabad",
    date: new Date("2026-03-18T10:00:00"),
    description: "Meet data science professionals",
    capacity: 35,
    category: "Technology"
  },
  {
    name: "Cloud Computing Workshop",
    organizer: "AWS Community",
    location: "Bangalore",
    date: new Date("2026-03-20T11:00:00"),
    description: "Cloud fundamentals and hands-on",
    capacity: 50,
    category: "Cloud"
  },
  {
    name: "Product Management Seminar",
    organizer: "PM Hub",
    location: "Delhi",
    date: new Date("2026-03-22T10:00:00"),
    description: "Product lifecycle management",
    capacity: 40,
    category: "Management"
  },
  {
    name: "UX/UI Design Workshop",
    organizer: "Design Studio",
    location: "Chennai",
    date: new Date("2026-03-25T09:00:00"),
    description: "Design better user experiences",
    capacity: 30,
    category: "Design"
  },
  {
    name: "Blockchain Basics",
    organizer: "CryptoLearn",
    location: "Pune",
    date: new Date("2026-03-28T11:00:00"),
    description: "Introduction to blockchain",
    capacity: 35,
    category: "Technology"
  },

  // ---- 10 MORE EVENTS ----

  {
    name: "Finance & Investment Summit",
    organizer: "FinCorp",
    location: "Mumbai",
    date: new Date("2026-04-01T10:00:00"),
    description: "Investment strategies and finance",
    capacity: 60,
    category: "Finance"
  },
  {
    name: "HR Leadership Meet",
    organizer: "HR Circle",
    location: "Delhi",
    date: new Date("2026-04-03T09:30:00"),
    description: "Leadership in HR",
    capacity: 40,
    category: "HR"
  },
  {
    name: "DevOps Bootcamp",
    organizer: "DevOps India",
    location: "Bangalore",
    date: new Date("2026-04-05T10:00:00"),
    description: "CI/CD and DevOps tools",
    capacity: 45,
    category: "Technology"
  },
  {
    name: "Mobile App Development",
    organizer: "CodeLabs",
    location: "Hyderabad",
    date: new Date("2026-04-07T11:00:00"),
    description: "Build mobile applications",
    capacity: 35,
    category: "Development"
  },
  {
    name: "Ethical Hacking Workshop",
    organizer: "HackSafe",
    location: "Chennai",
    date: new Date("2026-04-10T10:00:00"),
    description: "Learn ethical hacking",
    capacity: 30,
    category: "Security"
  },
  {
    name: "E-Commerce Growth Summit",
    organizer: "ShopSmart",
    location: "Mumbai",
    date: new Date("2026-04-12T09:00:00"),
    description: "Scale e-commerce businesses",
    capacity: 50,
    category: "Business"
  },
  {
    name: "Public Speaking Workshop",
    organizer: "SpeakWell",
    location: "Pune",
    date: new Date("2026-04-15T10:00:00"),
    description: "Improve communication skills",
    capacity: 25,
    category: "Personal Development"
  },
  {
    name: "Game Development Meetup",
    organizer: "GameDev India",
    location: "Bangalore",
    date: new Date("2026-04-18T11:00:00"),
    description: "Game development networking",
    capacity: 30,
    category: "Gaming"
  },
  {
    name: "Robotics Expo",
    organizer: "RoboTech",
    location: "Hyderabad",
    date: new Date("2026-04-20T10:00:00"),
    description: "Robotics and automation",
    capacity: 60,
    category: "Technology"
  },
  {
    name: "Career Guidance Seminar",
    organizer: "CareerPath",
    location: "Delhi",
    date: new Date("2026-04-22T09:30:00"),
    description: "Career planning and guidance",
    capacity: 40,
    category: "Education"
  }
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Event.deleteMany();
    await Event.insertMany(events);
    console.log('✅ 20 events inserted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed', error);
    process.exit(1);
  }
};

seedEvents();
