import { supabase } from "./supabase.js";

/* ---------- PDF UPLOAD ---------- */
const uploadBtn = document.getElementById("upload-pdf-btn");

if (uploadBtn) {
  uploadBtn.onclick = async () => {
    const fileInput = document.getElementById("pdf-file");
    const titleInput = document.getElementById("pdf-title");

    const file = fileInput.files[0];
    const title = titleInput.value.trim();

    if (!file || !title) {
      alert("File and title required");
      return;
    }

    const filePath = `pdfs/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase
      .storage
      .from("documents")
      .upload(filePath, file, {
        upsert: true,
        contentType: "application/pdf"
      });

    if (uploadError) {
      alert("Upload failed");
      console.error(uploadError);
      return;
    }

    const { data: urlData } = supabase
      .storage
      .from("documents")
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from("documents")
      .insert([
        {
          title,
          url: urlData.publicUrl
        }
      ]);

    if (dbError) {
      alert("Saved file but DB insert failed");
      console.error(dbError);
    } else {
      alert("PDF uploaded successfully");
      location.reload();
    }
  };
}