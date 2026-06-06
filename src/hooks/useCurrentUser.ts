import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type CurrentUser = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  avatar?: string;
  initials: string;
};

function computeInitials(name: string, email: string) {
  const source = (name || email || "U").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      if (!active) return;
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }
      const meta = (u.user_metadata ?? {}) as Record<string, string>;
      const name = meta.full_name || meta.name || u.email?.split("@")[0] || "User";
      const email = u.email ?? "";
      setUser({
        id: u.id,
        name,
        firstName: name.split(" ")[0],
        email,
        avatar: meta.avatar_url,
        initials: computeInitials(name, email),
      });
      setLoading(false);
    };
    load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
