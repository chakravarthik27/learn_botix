import { supabase } from './supabase';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export async function isAuthenticated() {
  const { session } = await getSession();
  return !!session;
}

export async function requireAuth() {
  const { session } = await getSession();
  if (!session) {
    throw new Error('Authentication required');
  }
  return session;
}
