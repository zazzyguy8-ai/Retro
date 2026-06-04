"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "./supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContext {
  user: User | null;
  screenName: string | null;
  loading: boolean;
  configured: boolean;
  signUp: (email: string, password: string, screenName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthContext>({
  user: null,
  screenName: null,
  loading: true,
  configured: false,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [screenName, setScreenName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const session = data?.session;
      setUser(session?.user ?? null);
      setScreenName(session?.user?.user_metadata?.screen_name ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setScreenName(session?.user?.user_metadata?.screen_name ?? null);
    });

    return () => data?.subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    if (!supabaseConfigured) return { error: "Supabase not configured. Add env vars." };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { screen_name: name } },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabaseConfigured) return { error: "Supabase not configured. Add env vars." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    if (!supabaseConfigured) return;
    await supabase.auth.signOut();
  };

  return (
    <AuthCtx.Provider value={{ user, screenName, loading, configured: supabaseConfigured, signUp, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
