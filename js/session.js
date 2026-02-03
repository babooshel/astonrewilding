import { supabase } from "./supabase.js";

export async function requireAuth() {
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) {
    alert("NOT LOGGED IN — upload will fail");
    throw new Error("Not authenticated");
  }
  return data.user;
}