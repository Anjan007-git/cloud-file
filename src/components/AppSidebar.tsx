import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Share2,
  Clock,
  Star,
  Trash2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import logoMark from "@/assets/cloudfile-logo-v2.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { useStorageStats, formatBytes, TOTAL_QUOTA_BYTES } from "@/hooks/useStorageStats";

const mainNav = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "My Files", to: "/files", icon: FolderOpen },
  { title: "Shared with me", to: "/shared", icon: Share2 },
  { title: "Recent", to: "/recent", icon: Clock },
  { title: "Starred", to: "/starred", icon: Star },
  { title: "Trash", to: "/trash", icon: Trash2 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { stats } = useStorageStats();
  const pct = (stats.usedBytes / TOTAL_QUOTA_BYTES) * 100;
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      if (!u) { setUser(null); return; }
      const meta = (u.user_metadata ?? {}) as Record<string, string>;
      setUser({
        name: meta.full_name || meta.name || u.email?.split("@")[0] || "User",
        email: u.email ?? "",
        avatar: meta.avatar_url,
      });
    };
    load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => load());
    return () => subscription.unsubscribe();
  }, []);

  const initials = (user?.name ?? "GU")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-gradient-sidebar text-sidebar-foreground p-5 gap-5 sticky top-0 h-screen">
      <Link to="/dashboard" className="flex items-center gap-3 px-1 py-1 group">
        <div className="size-11 rounded-xl bg-white grid place-items-center shadow-glow overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <img src={logoMark.url} alt="CloudFile" className="size-9" />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-base tracking-tight">CloudFile</div>
          <div className="text-[11px] text-white/70 tracking-wide">Enterprise Cloud</div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {mainNav.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-white text-primary shadow-elegant"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="size-[18px]" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="px-1 mt-1">
        <div className="text-[10px] font-semibold tracking-widest text-white/60 mb-3">
          STORAGE
        </div>
        <div className="text-sm text-white/90 mb-2">
          <span className="font-semibold">{formatBytes(stats.usedBytes)}</span>
          <span className="text-white/60"> of {formatBytes(TOTAL_QUOTA_BYTES)} used</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-aqua to-primary-glow rounded-full transition-all"
            style={{ width: `${Math.max(pct, 2)}%` }}
          />
        </div>
        <Link
          to="/storage"
          className="mt-4 w-full rounded-xl bg-white/12 hover:bg-white/20 text-white text-sm font-semibold py-2.5 transition-colors flex items-center justify-center"
        >
          Upgrade Storage
        </Link>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/10">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="size-9 rounded-full object-cover" />
              ) : (
                <div className="size-9 rounded-full bg-gradient-to-br from-aqua to-primary-glow grid place-items-center text-white font-bold text-sm">
                  {initials}
                </div>
              )}
              <div className="flex-1 leading-tight min-w-0">
                <div className="text-sm font-semibold truncate">{user.name}</div>
                <div className="text-[11px] text-white/60 truncate">{user.email}</div>
              </div>
              <ChevronDown className="size-4 text-white/60" />
            </div>
            <div className="flex items-center justify-around border-t border-white/10 pt-3">
              <Link to="/settings" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10" aria-label="Settings">
                <Settings className="size-[18px]" />
              </Link>
              <Link to="/help" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10" aria-label="Help">
                <HelpCircle className="size-[18px]" />
              </Link>
              <Link to="/logout" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10" aria-label="Logout">
                <LogOut className="size-[18px]" />
              </Link>
            </div>
          </>
        ) : (
          <Link
            to="/auth"
            className="w-full rounded-xl bg-white text-primary text-sm font-semibold py-2.5 flex items-center justify-center shadow-elegant hover:opacity-95 transition-opacity"
          >
            Sign in
          </Link>
        )}
      </div>

    </aside>
  );
}
