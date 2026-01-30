import { supabase } from "./supabase.js";

// Load site content
const { data: content } = await supabase.from("content").select("*");
content.forEach(c => {
  const el = document.getElementById(c.key);
  if (el) el.innerText = c.value;
});

// Load events
const { data: events } = await supabase
  .from("events")
  .select("*")
  .order("created_at", { ascending: false });

document.getElementById("eventsList").innerHTML =
  events.map(e => `
    <div class="card">
      <h3>${e.title}</h3>
      <strong>${e.date}</strong>
      <p>${e.description}</p>
    </div>
  `).join("");
