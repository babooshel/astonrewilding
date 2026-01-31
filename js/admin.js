import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", async () => {

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    window.location.href = "admin-login.html";
    return;
  }

  const eventTitle = document.getElementById("event-title");
  const eventDate = document.getElementById("event-date");
  const eventDesc = document.getElementById("event-desc");
  const addEventBtn = document.getElementById("add-event");
  const eventsAdmin = document.getElementById("events-admin");

  const pdfInput = document.getElementById("weekly-pdf");
  const uploadBtn = document.getElementById("upload-pdf");
  const pdfMsg = document.getElementById("pdf-msg");

  const logoutBtn = document.getElementById("logout");

  // ---------- LOAD EVENTS ----------
  async function loadAdminEvents() {
    const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    if (error) return;

    eventsAdmin.innerHTML = "";
    data.forEach(e => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${e.title}</strong> - ${e.date} <button onclick="deleteEvent('${e.id}')">Delete</button>`;
      eventsAdmin.appendChild(div);
    });
  }

  window.deleteEvent = async (id) => {
    await supabase.from("events").delete().eq("id", id);
    loadAdminEvents();
  };

  await loadAdminEvents();

  // ---------- ADD EVENT ----------
  addEventBtn.onclick = async () => {
    if (!eventTitle.value || !eventDesc.value) {
      alert("Title and description required");
      return;
    }

    const { error } = await supabase.from("events").insert({
      title: eventTitle.value,
      description: eventDesc.value,
      date: eventDate.value
    });

    if (error) {
      alert("Failed to add event");
      console.error(error);
      return;
    }

    alert("Event added");
    eventTitle.value = "";
    eventDesc.value = "";
    eventDate.value = "";
    loadAdminEvents();
  };

  // ---------- UPLOAD PDF ----------
  uploadBtn.onclick = async () => {
    const file = pdfInput.files[0];
    if (!file) {
      pdfMsg.textContent = "Select a PDF first.";
      return;
    }

    const { data, error } = await supabase.storage
      .from("weekly-pdfs")
      .upload(`weekly-news/${file.name}`, file, { upsert: true });

    if (error) {
      pdfMsg.textContent = "Upload failed.";
      console.error(error);
      return;
    }

    pdfMsg.textContent = "PDF uploaded successfully!";
    pdfInput.value = "";
  };

  // ---------- LOGOUT ----------
  logoutBtn.onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  };

});
