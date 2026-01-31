import { supabase } from "./supabase.js";

const newsContainer = document.getElementById("news-container");

async function loadNews() {
  const { data, error } = await supabase
    .from("news")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    newsContainer.innerHTML = "<p>Failed to load news.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    newsContainer.innerHTML = "<p>No news available.</p>";
    return;
  }

  newsContainer.innerHTML = "";

  data.forEach(item => {
    const title = item.title ?? "Untitled";
    const body = item.body ?? "";
    const date = item.created_at ? new Date(item.created_at).toLocaleDateString() : "";

    const article = document.createElement("article");
    article.innerHTML = `
      <h3>${title}</h3>
      <p>${body}</p>
      <small>${date}</small>
    `;

    newsContainer.appendChild(article);
  });
}

loadNews();
