import { supabase } from './supabase';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const session = localStorage.getItem('supabase_session');
  return !!session;
}

export async function requireAuth() {
  const { session } = await getSession();
  return !!session;
}
