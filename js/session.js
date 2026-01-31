import { supabase } from "./supabase.js";

export async function isLoggedIn() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}
