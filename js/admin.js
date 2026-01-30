import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    alert("You must be logged in as admin.");
    window.location.href = "/";
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError || profile.role !== 'admin') {
    alert("Access denied: Not an admin.");
    window.location.href = "/";
    return;
  }

  // Show admin panel
  document.getElementById('admin-panel').style.display = 'block';

  // Load events
  const { data: events } = await supabase.from('events').select('*').order('date', { ascending: true });
  const eventsContainer = document.getElementById('admin-events');
  eventsContainer.innerHTML = '';
  events.forEach(e => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${e.title}</h4>
      <p>${e.date}</p>
      <p>${e.description}</p>
      <button data-id="${e.id}" class="edit-event">Edit</button>
      <button data-id="${e.id}" class="delete-event">Delete</button>
    `;
    eventsContainer.appendChild(div);
  });

  // Add event handlers
  document.addEventListener('click', async (ev) => {
    if (ev.target.classList.contains('delete-event')) {
      const id = ev.target.dataset.id;
      await supabase.from('events').delete().eq('id', id);
      location.reload();
    }
    if (ev.target.classList.contains('edit-event')) {
      const id = ev.target.dataset.id;
      const newTitle = prompt("New title?");
      if (newTitle) await supabase.from('events').update({ title: newTitle }).eq('id', id);
      location.reload();
    }
  });

  // Add update/event buttons
  document.getElementById('add-event-btn')?.addEventListener('click', async () => {
    const title = prompt("Event title?");
    const date = prompt("Event date?");
    const description = prompt("Event description?");
    if (title && date && description) await supabase.from('events').insert([{ title, date, description }]);
    location.reload();
  });

  document.getElementById('add-update-btn')?.addEventListener('click', async () => {
    const content = prompt("Update content?");
    if (content) await supabase.from('updates').insert([{ content }]);
    location.reload();
  });

  // Logout
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  });
});
