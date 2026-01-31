import { supabase } from "./supabase.js";

const container = document.getElementById("news-container");

async function loadNews() {
  const { data, error } = await supabase
    .from("news")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = "<p>Failed to load news.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No news available.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach(item => {
    const title = item.title ?? "Untitled";
    const body = item.body ?? "";
    const date = item.created_at
      ? new Date(item.created_at).toLocaleDateString()
      : "";

    const article = document.createElement("article");
    article.innerHTML = `
      <h3>${title}</h3>
      <p>${body}</p>
      <small>${date}</small>
    `;

    container.appendChild(article);
  });
}

loadNews();
