import { supabase } from "./supabase.js";

const list = document.getElementById("news-list");

const { data } = await supabase
  .from("news")
  .select("*")
  .order("created_at", { ascending: false });

data.forEach(n => {
  list.innerHTML += `
    <article>
      <h3>${n.title}</h3>
      <small>${n.date}</small>
      <p>${n.body}</p>
    </article>
  `;
});
