import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/logout")({
  head: () => ({ meta: [{ title: "Logout — CloudFile" }] }),
  component: LogoutPage,
});

function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/" }), 1200);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-hero px-4">
      <div className="bg-card rounded-2xl p-10 shadow-elegant border border-border/60 text-center max-w-sm">
        <div className="size-14 mx-auto rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4">
          <LogOut className="size-6" />
        </div>
        <h1 className="text-xl font-bold">Signing you out…</h1>
        <p className="text-sm text-muted-foreground mt-2">You'll be redirected to the home page shortly.</p>
        <Link to="/" className="mt-5 inline-flex px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground items-center font-semibold text-sm shadow-elegant">
          Go now
        </Link>
      </div>
    </div>
  );
}
