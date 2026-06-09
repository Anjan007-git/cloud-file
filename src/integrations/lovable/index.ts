// This file has been updated to use Supabase Auth only.
// Lovable Auth has been removed in favor of pure Supabase authentication.

import { supabase } from "../supabase/client";

type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const auth = {
  signInWithOAuth: async (provider: "google" | "apple" | "microsoft", opts?: SignInOptions) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: opts?.redirect_uri || window.location.origin + "/dashboard",
        },
      });

      if (error) {
        return { error };
      }

      return { data };
    } catch (e) {
      return { error: e instanceof Error ? e : new Error(String(e)) };
    }
  },
};

// For backwards compatibility, also export as lovable
export const lovable = auth;
