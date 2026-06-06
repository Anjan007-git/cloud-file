import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function MarketingPage({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><Logo size={32} /></Link>
          <Link to="/" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] inline-flex items-center gap-1.5">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-[#475569] mt-4 leading-relaxed">{description}</p>
        <div className="mt-10 prose prose-slate max-w-none text-[#475569] leading-relaxed space-y-5">
          {children ?? (
            <p>
              This page is part of the CloudFile product experience and will be expanded with full content in upcoming releases.
              For immediate assistance, please reach out via the <Link to="/contact" className="text-[#0EA5E9] font-medium hover:underline">contact page</Link>.
            </p>
          )}
        </div>
      </main>
      <footer className="border-t border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-6 text-sm text-[#64748B]">© 2026 CloudFile. All rights reserved.</div>
      </footer>
    </div>
  );
}
