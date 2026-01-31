import { supabase } from "./supabase.js";
import { requireAdmin } from "./auth.js";

await requireAdmin();

/* ---------- LOGOUT ---------- */
logout.onclick = async () => {
  await supabase.auth.signOut();
  location.href = "admin.html";
};

/* ---------- LOAD DATA ---------- */
async function loadEvents() {
  const { data } = await supabase.from("events").select("*").order("date");
  eventList.innerHTML = "";

  data.forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${e.title}</strong> (${e.date})
      <button data-id="${e.id}">Delete</button>
    `;
    li.querySelector("button").onclick = () => deleteEvent(e.id);
    eventList.appendChild(li);
  });
}

async function loadNews() {
  const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false });
  newsList.innerHTML = "";

  data.forEach(n => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${n.title}</strong>
      <button data-id="${n.id}">Delete</button>
    `;
    li.querySelector("button").onclick = () => deleteNews(n.id);
    newsList.appendChild(li);
  });
}

/* ---------- ADD ---------- */
addEvent.onclick = async () => {
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

addNews.onclick = async () => {
  await supabase.from("news").insert({
    title: newsTitle.value,
    content: newsContent.value
  });

  newsTitle.value = "";
  newsContent.value = "";

  loadNews();
};

/* ---------- DELETE ---------- */
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

/* ---------- INIT ---------- */
loadEvents();
loadNews();
