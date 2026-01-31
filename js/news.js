import { supabase } from "./supabase.js";

const newsContainer = document.getElementById("news-container");

async function loadNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    newsContainer.textContent = "Failed to load news";
    return;
  }

  if (!data.length) {
    newsContainer.textContent = "No news yet";
    return;
  }

  newsContainer.innerHTML = "";

  data.forEach(item => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      <small>${new Date(item.created_at).toLocaleDateString()}</small>
    `;
    newsContainer.appendChild(article);
  });
}

loadNews();
