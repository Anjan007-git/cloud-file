import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderOpen,
  Share2,
  Clock,
  Star,
  Trash2,
  HardDrive,
  Settings,
  HelpCircle,
  LogOut,
  Cloud,
  ChevronDown,
} from "lucide-react";

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
  const usedGb = 0;
  const totalGb = 200;
  const pct = (usedGb / totalGb) * 100;

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-gradient-sidebar text-sidebar-foreground p-5 gap-5 sticky top-0 h-screen">
      <Link to="/dashboard" className="flex items-center gap-2.5 px-1">
        <div className="size-10 rounded-xl bg-white/15 backdrop-blur grid place-items-center shadow-glow">
          <Cloud className="size-5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-base">CloudFile</div>
          <div className="text-xs text-white/70">Manager</div>
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
          <span className="font-semibold">{usedGb} GB</span>
          <span className="text-white/60"> of {totalGb} GB used</span>
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
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/10">
          <div className="size-9 rounded-full bg-gradient-to-br from-aqua to-primary-glow grid place-items-center text-white font-bold text-sm">
            AJ
          </div>
          <div className="flex-1 leading-tight min-w-0">
            <div className="text-sm font-semibold truncate">Alex Johnson</div>
            <div className="text-[11px] text-white/60 truncate">alex.johnson@mail.com</div>
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
      </div>
    </aside>
  );
}
