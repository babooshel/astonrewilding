import { supabase } from "./supabase.js";

export async function requireAdmin(redirect = true) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    if (redirect) window.location.href = "admin.html";
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!data || data.role !== "admin") {
    await supabase.auth.signOut();
    if (redirect) window.location.href = "admin.html";
    return null;
  }

  return session.user;
}
