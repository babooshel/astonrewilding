import { supabase } from "./supabase.js";

const form = document.getElementById("login-form");
const errorBox = document.getElementById("login-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = "Logging in...";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorBox.textContent = error.message;
    return;
  }

  window.location.href = "admin-dashboard.html";
});
