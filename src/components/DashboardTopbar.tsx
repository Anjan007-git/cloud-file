import { Bell, Search, Upload, User as UserIcon, Settings, CreditCard, LifeBuoy, LogOut } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { supabase } from "@/integrations/supabase/client";

export function DashboardTopbar() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const initials = user?.initials ?? "GU";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="flex items-center gap-3 mb-8">
      {/* Search */}
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files and folders…"
          className="w-full h-11 pl-11 pr-16 rounded-2xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 shadow-sm transition-all"
        />
        <kbd className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-2 h-6 rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Notifications */}
      <button className="relative size-11 rounded-2xl bg-card border border-border grid place-items-center hover:bg-muted hover:shadow-card transition-all" aria-label="Notifications">
        <Bell className="size-[18px] text-foreground" />
        <span className="absolute -top-1 -right-1 size-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center">
          3
        </span>
      </button>

      {/* Upload */}
      <button className="h-11 px-5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 shadow-elegant hover:shadow-glow hover:opacity-95 transition-all">
        <Upload className="size-4" /> Upload
      </button>

      {/* Profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="size-11 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center font-bold text-sm shadow-card hover:shadow-elegant transition-all overflow-hidden"
            aria-label="Account menu"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="size-full object-cover" />
            ) : (
              initials
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="flex items-center gap-3 py-3">
            <div className="size-10 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center font-bold text-sm overflow-hidden">
              {user?.avatar ? <img src={user.avatar} alt="" className="size-full object-cover" /> : initials}
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold truncate">{user?.name ?? "Guest"}</div>
              <div className="text-xs text-muted-foreground truncate font-normal">{user?.email ?? ""}</div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/settings"><UserIcon className="mr-2 size-4" /> Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings"><Settings className="mr-2 size-4" /> Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings"><CreditCard className="mr-2 size-4" /> Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/help-center"><LifeBuoy className="mr-2 size-4" /> Help & Support</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 size-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
