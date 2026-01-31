import { supabase } from "./supabase.js";

document.getElementById("login").onclick = async () => {
  const email = email.value;
  const password = password.value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    msg.textContent = error.message;
  } else {
    window.location.href = "admin-dashboard.html";
  }
};
