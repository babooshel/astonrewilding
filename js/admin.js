import { supabase } from "./supabase.js";

const session = await supabase.auth.getSession();
if (!session.data.session) {
  window.location.href = "admin-login.html";
}

// ---------- LOAD ----------
async function loadAdmin() {
  const newsBox = document.getElementById("news-admin");
  const eventsBox = document.getElementById("events-admin");

  const { data: news } = await supabase.from("news").select("*");
  const { data: events } = await supabase.from("events").select("*");

  newsBox.innerHTML = "";
  eventsBox.innerHTML = "";

  news.forEach(n => {
    newsBox.innerHTML += `
      <article>
        <strong>${n.title}</strong>
        <button onclick="deleteNews('${n.id}')">Delete</button>
      </article>`;
  });

  events.forEach(e => {
    eventsBox.innerHTML += `
      <article>
        <strong>${e.title}</strong>
        <button onclick="deleteEvent('${e.id}')">Delete</button>
      </article>`;
  });
}

window.deleteNews = async (id) => {
  await supabase.from("news").delete().eq("id", id);
  loadAdmin();
};

window.deleteEvent = async (id) => {
  await supabase.from("events").delete().eq("id", id);
  loadAdmin();
};

// ---------- ADD ----------
document.getElementById("add-news").onclick = async () => {
  await supabase.from("news").insert({
    title: document.getElementById("news-title").value,
    date: document.getElementById("news-date").value,
    body: document.getElementById("news-body").value
  });
  loadAdmin();
};

document.getElementById("add-event").onclick = async () => {
  await supabase.from("events").insert({
    title: document.getElementById("event-title").value,
    date: document.getElementById("event-date").value,
    description: document.getElementById("event-desc").value
  });
  loadAdmin();
};

// ---------- LOGOUT ----------
document.getElementById("logout").onclick = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};

loadAdmin();
