import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDyXHD8mWCHIbc0oY91xE5nQfKI2-5nAY8",
  authDomain: "pivot-energy-ltd.firebaseapp.com",
  projectId: "pivot-energy-ltd",
  storageBucket: "pivot-energy-ltd.appspot.com",
  messagingSenderId: "474291568078",
  appId: "1:474291568078:web:bfcb2a2a022f230f357f9f",
  measurementId: "G-QFY448HP19"
};

// ✅ Safe Firebase initialization
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

// DOM container
const container = document.getElementById("upcoming-projects-container");

// Load and create upcoming projects
async function loadUpcomingProjects() {
  const colRef = collection(db, "upcomingProjects");
  const querySnapshot = await getDocs(colRef);

  // ✅ Create sample data if none exists
  if (querySnapshot.empty) {
    await addDoc(colRef, {
      title: "Upcoming Solar Installation",
      description: "We are preparing a 200kW solar project in Naivasha."
    });
    await addDoc(colRef, {
      title: "Battery Storage Expansion",
      description: "A new energy storage facility is coming to Kisumu."
    });
    return loadUpcomingProjects(); // Retry fetch after adding
  }

  // ✅ Render projects
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-title">${data.title}</div>
      <div class="project-description">${data.description}</div>
    `;

    container.appendChild(card);
  });
}

loadUpcomingProjects();
