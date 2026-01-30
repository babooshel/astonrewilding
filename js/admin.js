import { supabase } from "./supabase.js";

// Auth check
const { data:{ user } } = await supabase.auth.getUser();
if (!user) location.href = "/";

// Role check
const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single();

if (profile.role !== "admin") {
  document.body.innerHTML = "Access denied";
}

// Load editable content
const { data: content } = await supabase.from("content").select("*");
content.forEach(c => {
  const el = document.getElementById(c.key);
  if (el) el.value = c.value;
});

// Save content
saveContent.onclick = async () => {
  for (const c of content) {
    await supabase
      .from("content")
      .update({ value: document.getElementById(c.key).value })
      .eq("key", c.key);
  }
  alert("Content updated");
};

// Add event
addEvent.onclick = async () => {
  await supabase.from("events").insert({
    title: title.value,
    date: date.value,
    description: description.value
  });
  alert("Event added");
};
