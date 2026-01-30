import { supabase } from './supabase.js';

async function loadPageContent(key, elementId) {
  const { data } = await supabase
    .from('pages')
    .select('content')
    .eq('key', key)
    .single();
  document.getElementById(elementId).innerText = data?.content || '';
}

// Events
async function loadEvents() {
  const { data } = await supabase.from('events').select('*').order('date',{ ascending:true });
  const container = document.getElementById('events-container');
  if (!container) return;
  container.innerHTML = data.map(e => `
    <div class="card">
      <h3>${e.title}</h3>
      <strong>${e.date}</strong>
      <p>${e.description}</p>
    </div>
  `).join('');
}

// News
async function loadNews() {
  const { data } = await supabase.from('news').select('*').order('date',{ ascending:false });
  const container = document.getElementById('news-container');
  if (!container) return;
  container.innerHTML = data.map(n => `
    <div class="card">
      <h3>${n.title}</h3>
      <strong>${n.date}</strong>
      <p>${n.body}</p>
    </div>
  `).join('');
}

loadPageContent('home-intro','home-intro-text');
loadPageContent('about','about-text');
loadEvents();
loadNews();
