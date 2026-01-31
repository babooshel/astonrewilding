import { supabase } from "./supabase.js";

const session = await supabase.auth.getSession();
if (!session.data.session) {
  window.location.href = "admin-login.html";
}

document.getElementById("add-news").onclick = async () => {
  await supabase.from("news").insert({
    title: news-title.value,
    body: news-body.value,
    date: news-date.value
  });
  alert("News added");
};

document.getElementById("add-event").onclick = async () => {
  await supabase.from("events").insert({
    title: event-title.value,
    description: event-desc.value,
    date: event-date.value
  });
  alert("Event added");
};

document.getElementById("logout").onclick = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};
