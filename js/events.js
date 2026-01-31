import { supabase } from "./supabase.js";

const list = document.getElementById("events-list");

const { data } = await supabase
  .from("events")
  .select("*")
  .order("created_at", { ascending: false });

data.forEach(e => {
  list.innerHTML += `
    <article>
      <h3>${e.title}</h3>
      <small>${e.date}</small>
      <p>${e.description}</p>
    </article>
  `;
});
