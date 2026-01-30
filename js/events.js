import { supabase } from "./supabase.js";

const container = document.getElementById("events");

const { data } = await supabase
  .from("events")
  .select("*")
  .order("created_at", { ascending: false });

container.innerHTML = data.map(e => `
  <div class="card">
    <h3>${e.title}</h3>
    <strong>${e.date}</strong>
    <p>${e.description}</p>
  </div>
`).join("");
