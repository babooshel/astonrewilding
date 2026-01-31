import { supabase } from "./supabase.js";

const status = document.getElementById("status");
const loginBox = document.getElementById("login-box");
const adminPanel = document.getElementById("admin-panel");

async function init() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    showLogin("Login required");
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error || !profile) {
    status.textContent = "Profile not found";
    return;
  }

  if (profile.role !== "admin") {
    status.textContent = "Access denied";
    return;
  }

  // ADMIN OK
  status.textContent = "Admin access granted";
  loginBox.style.display = "none";
  adminPanel.style.display = "block";
}

function showLogin(message) {
  status.textContent = message;
  loginBox.style.display = "block";
  adminPanel.style.display = "none";
}

document.getElementById("login-btn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login failed");
    return;
  }

  init();
};

document.getElementById("logout-btn").onclick = async () => {
  await supabase.auth.signOut();
  showLogin("Logged out");
};

init();
