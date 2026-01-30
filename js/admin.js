import { supabase } from "./supabase.js";

// 1️⃣ Check admin role
const { data: { user } } = await supabase.auth.getUser();
if (!user) location.href = "/";

const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single();

if (!profile || profile.role !== "admin") {
  document.body.innerHTML = "<h1>Access denied</h1>";
  throw new Error("Not admin");
}

// 2️⃣ Load content
const { data: content } = await supabase.from("content").select("*");
content.forEach(c => {
  const el = document.getElementById(c.key);
  if (el) el.value = c.value;
});

// 3️⃣ Save content
document.getElementById("saveContent").onclick = async () => {
  for (const c of content) {
    await supabase
      .from("content")
      .update({ value: document.getElementById(c.key).value })
      .eq("key", c.key);
  }
  alert("All content saved!");
};

// 4️⃣ Load events
async function loadEvents() {
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  document.getElementById("eventsList").innerHTML =
    events.map(e => `
      <div class="card">
        <h4>${e.title}</h4>
        <strong>${e.date}</strong>
        <p>${e.description}</p>
      </div>
    `).join("");
}
await loadEvents();

// 5️⃣ Add event
document.getElementById("addEvent").onclick = async () => {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  if (!title || !date || !description) return alert("All fields are required!");

  await supabase.from("events").insert({ title, date, description });

  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";

  await loadEvents();
  alert("Event added!");
};
