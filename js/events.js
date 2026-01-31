import { supabase } from "./supabase.js";

const list = document.getElementById("events-list");

async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("id, title, date, description")
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "<p>Failed to load events.</p>";
    return;
  }

  list.innerHTML = "";

  data.forEach(e => {
    list.innerHTML += `
      <article>
        <h3>${e.title}</h3>
        <small>${e.date}</small>
        <p>${e.description}</p>
      </article>
    `;
  });
}

loadEvents();
