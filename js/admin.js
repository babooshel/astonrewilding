alert("admin.js loaded");
import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", async () => {

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    window.location.href = "admin-login.html";
    return;
  }

  // -------- ELEMENTS --------
  const newsTitle = document.getElementById("news-title");
  const newsDate = document.getElementById("news-date");
  const newsBody = document.getElementById("news-body");
  const addNewsBtn = document.getElementById("add-news");

  const eventTitle = document.getElementById("event-title");
  const eventDate = document.getElementById("event-date");
  const eventDesc = document.getElementById("event-desc");
  const addEventBtn = document.getElementById("add-event");

  const logoutBtn = document.getElementById("logout");

  // -------- ADD NEWS --------
  addNewsBtn.addEventListener("click", async () => {
    if (!newsTitle.value || !newsBody.value) {
      alert("News title and body required");
      return;
    }

    const { error } = await supabase.from("news").insert({
      title: newsTitle.value,
      body: newsBody.value,
      date: newsDate.value
    });

    if (error) {
      alert("Failed to add news");
      console.error(error);
      return;
    }

    alert("News added");

    newsTitle.value = "";
    newsBody.value = "";
    newsDate.value = "";
  });

  // -------- ADD EVENT --------
  addEventBtn.addEventListener("click", async () => {
    if (!eventTitle.value || !eventDesc.value) {
      alert("Event title and description required");
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
  });

  // -------- LOGOUT --------
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });

});
