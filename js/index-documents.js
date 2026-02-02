import { supabase } from "./supabase.js";

const container = document.getElementById("documents-list");

async function loadDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("title, file_path, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error || !data) {
    container.innerHTML = "<p>Unable to load documents.</p>";
    console.error(error);
    return;
  }

  data.forEach(doc => {
    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(doc.file_path);

    const card = document.createElement("div");
    card.className = "doc-card";

    card.innerHTML = `
      <h3>${doc.title}</h3>

      <iframe 
        src="${urlData.publicUrl}#page=1&view=FitH" 
        loading="lazy">
      </iframe>

      <a href="${urlData.publicUrl}" download class="download-btn">
        Download PDF
      </a>
    `;

    container.appendChild(card);
  });
}

loadDocuments();