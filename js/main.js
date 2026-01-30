import { supabase } from './supabase.js';

// Modal functionality
const loginModal = document.getElementById('login-modal');
const adminBtn = document.getElementById('admin-btn');
const closeBtn = document.querySelector('.close');

adminBtn.addEventListener('click', () => loginModal.style.display = 'block');
closeBtn.addEventListener('click', () => loginModal.style.display = 'none');

window.addEventListener('click', e => {
  if (e.target == loginModal) loginModal.style.display = 'none';
});

// Login functionality
document.getElementById('login-submit').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
  } else {
    alert('Perfect, you are now logged in!');
    loginModal.style.display = 'none';
    window.location.href = '/admin.html';
  }
});

// Load events
const eventsContainer = document.getElementById('events-container');
const updatesContainer = document.getElementById('updates-container');

async function loadEvents() {
  const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
  if (error) return console.error(error);

  eventsContainer.innerHTML = '';
  data.forEach(e => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${e.title}</h3><p>${e.date}</p><p>${e.description}</p>`;
    eventsContainer.appendChild(div);
  });
}

async function loadUpdates() {
  const { data, error } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
  if (error) return console.error(error);

  updatesContainer.innerHTML = '';
  data.forEach(u => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${u.content}</p>`;
    updatesContainer.appendChild(div);
  });
}

loadEvents();
loadUpdates();
