import { supabase } from "./supabase.js";
import { requireAdmin } from "./auth.js";

await requireAdmin();

// ELEMENTS
const eventList = document.getElementById("event-list");
const newsList = document.getElementById("news-list");

const eventTitle = document.getElementById("event-title");
const eventDate = document.getElementById("event-date");
const eventDesc = document.getElementById("event-desc");

const newsTitle = document.getElementById("news-title");
const newsContent = document.getElementById("news-content");

const logoutBtn = document.getElementById("logout");
const addEventBtn = document.getElementById("add-event");
const addNewsBtn = document.getElementById("add-news");

// LOGOUT
logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
  location.href = "admin.html";
};

// LOAD EVENTS
async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  eventList.innerHTML = "";

  if (error) {
    eventList.innerHTML = "<li>Error loading events</li>";
    return;
  }

  if (!data.length) {
    eventList.innerHTML = "<li>No events yet</li>";
    return;
  }

  data.forEach(event => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${event.title}</strong><br>
        <small>${event.date}</small>
      </span>
      <button data-id="${event.id}">Delete</button>
    `;

    li.querySelector("button").onclick = () => deleteEvent(event.id);
    eventList.appendChild(li);
  });
}

// LOAD NEWS
async function loadNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  newsList.innerHTML = "";

  if (error) {
    newsList.innerHTML = "<li>Error loading news</li>";
    return;
  }

  if (!data.length) {
    newsList.innerHTML = "<li>No news yet</li>";
    return;
  }

  data.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${item.title}</strong></span>
      <button data-id="${item.id}">Delete</button>
    `;
    li.querySelector("button").onclick = () => deleteNews(item.id);
    newsList.appendChild(li);
  });
}

// ADD EVENT
addEventBtn.onclick = async () => {
  if (!eventTitle.value || !eventDate.value) return alert("Missing fields");

  await supabase.from("events").insert({
    title: eventTitle.value,
    date: eventDate.value,
    description: eventDesc.value
  });

  eventTitle.value = "";
  eventDate.value = "";
  eventDesc.value = "";

  loadEvents();
};

// ADD NEWS
addNewsBtn.onclick = async () => {
  if (!newsTitle.value || !newsContent.value) return alert("Missing fields");

  await supabase.from("news").insert({
    title: newsTitle.value,
    content: newsContent.value
  });

  newsTitle.value = "";
  newsContent.value = "";

  loadNews();
};

// DELETE
async function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;
  await supabase.from("events").delete().eq("id", id);
  loadEvents();
}

async function deleteNews(id) {
  if (!confirm("Delete this news item?")) return;
  await supabase.from("news").delete().eq("id", id);
  loadNews();
}

// INIT
loadEvents();
loadNews();
