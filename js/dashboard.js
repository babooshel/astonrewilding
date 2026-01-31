import { supabase } from "./supabase.js";
import { requireAdmin } from "./auth.js";

await requireAdmin();

logout.onclick = async () => {
  await supabase.auth.signOut();
  location.href = "admin.html";
};

addEvent.onclick = async () => {
  await supabase.from("events").insert({
    title: eventTitle.value,
    date: eventDate.value,
    description: eventDesc.value
  });
  alert("Event added");
};

addNews.onclick = async () => {
  await supabase.from("news").insert({
    title: newsTitle.value,
    content: newsContent.value
  });
  alert("News added");
};
