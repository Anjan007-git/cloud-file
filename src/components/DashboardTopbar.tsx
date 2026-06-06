import { Search, Upload, User as UserIcon, Settings, CreditCard, LifeBuoy, LogOut } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFiles } from "@/hooks/useFiles";
import { supabase } from "@/integrations/supabase/client";
import { NotificationsButton } from "@/components/NotificationsButton";

export function DashboardTopbar() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const initials = user?.initials ?? "GU";
  const { upload, uploading } = useFiles("recent");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="flex items-center gap-3 mb-8">
      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files and folders..."
          className="w-full h-10 pl-11 pr-4 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
        />
      </div>

      <div className="flex-1" />

      {/* Right cluster */}
      <div className="flex items-center gap-2.5">
        <NotificationsButton />

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) upload(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-sm"
        >
          <Upload className="size-4" /> {uploading ? "Uploading…" : "Upload"}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="size-10 rounded-xl bg-primary text-primary-foreground grid place-items-center font-semibold text-sm hover:opacity-90 transition-opacity overflow-hidden"
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
              <div className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold text-sm overflow-hidden">
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
      </div>
    </header>
  );
}
