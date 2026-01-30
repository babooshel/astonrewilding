import { supabase } from './supabase.js';

// Ensure logged in
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  alert("Login required"); location.href = "/";
}

// Check admin role
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', session.user.id)
  .single();

if (profile.role !== 'admin') {
  alert("Access denied"); location.href = "/";
}

document.getElementById('admin-section').style.display = 'block';

// Load pages into inputs
const keys = ['home-intro','about'];
for (let key of keys) {
  const { data } = await supabase.from('pages').select('content').eq('key',key).single();
  document.getElementById(key).value = data?.content || '';
}

document.getElementById('save-pages').onclick = async () => {
  for (let key of keys) {
    await supabase.from('pages').upsert({ key, content: document.getElementById(key).value });
  }
  alert("Pages saved");
};

// Events admin
async function refreshAdminEvents() {
  const { data } = await supabase.from('events').select('*').order('date',{ ascending:true });
  const div = document.getElementById('admin-events');
  div.innerHTML = data.map(e => `
    <div class="card">
      <h4>${e.title}</h4>
      <button data-id="${e.id}" class="del-event">Delete</button>
    </div>
  `).join('');
  div.querySelectorAll('.del-event').forEach(btn => {
    btn.onclick = async () => {
      await supabase.from('events').delete().eq('id',btn.dataset.id);
      refreshAdminEvents();
    };
  });
}

refreshAdminEvents();

document.getElementById('add-event').onclick = async () => {
  const title = prompt("Event title?");
  const date = prompt("Event date?");
  const desc = prompt("Event description?");
  if (title && date && desc) await supabase.from('events').insert([{ title,date,description:desc }]);
  refreshAdminEvents();
};

// News admin
async function refreshAdminNews() {
  const { data } = await supabase.from('news').select('*').order('date',{ ascending:false });
  const div = document.getElementById('admin-news');
  div.innerHTML = data.map(n => `
    <div class="card">
      <h4>${n.title}</h4>
      <button data-id="${n.id}" class="del-news">Delete</button>
    </div>
  `).join('');
  div.querySelectorAll('.del-news').forEach(btn => {
    btn.onclick = async () => {
      await supabase.from('news').delete().eq('id',btn.dataset.id);
      refreshAdminNews();
    };
  });
}

refreshAdminNews();

document.getElementById('add-news').onclick = async () => {
  const title = prompt("News title?");
  const date = prompt("News date?");
  const body = prompt("News body?");
  if (title && date && body) await supabase.from('news').insert([{ title, date, body }]);
  refreshAdminNews();
};

// Logout
document.getElementById('logout').onclick = async () => {
  await supabase.auth.signOut();
  location.href="/";
};
