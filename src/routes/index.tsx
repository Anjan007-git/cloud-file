import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Shield,
  Zap,
  Share2,
  RefreshCw,
  Check,
  ArrowRight,
  Lock,
  History,
  Users,
  Search,
  Globe,
  Server,
  ChevronDown,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CloudFile — Secure Cloud Storage Built for Modern Teams" },
      { name: "description", content: "Store, organize, share and access your files from anywhere with enterprise-grade security, lightning-fast performance, and seamless collaboration." },
      { property: "og:title", content: "CloudFile — Secure Cloud Storage Built for Modern Teams" },
      { property: "og:description", content: "Enterprise-grade encrypted cloud storage with real-time sync, granular sharing, and team collaboration." },
      { property: "og:url", content: "https://cloud-file.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/" }],
  }),
  component: Landing,
});

const features = [
  { icon: Server, title: "Secure Cloud Storage", desc: "Files stored on redundant infrastructure with 99.999999999% durability." },
  { icon: RefreshCw, title: "Real-Time Sync", desc: "Changes appear instantly across every device — desktop, tablet, mobile." },
  { icon: History, title: "Version History", desc: "Restore any previous version of a file. Never lose work to a bad save." },
  { icon: Share2, title: "File Sharing", desc: "Generate secure links with passwords, expirations, and download limits." },
  { icon: Lock, title: "Access Control", desc: "Granular permissions per file or folder. Decide exactly who sees what." },
  { icon: Users, title: "Team Collaboration", desc: "Shared workspaces, real-time activity, and unified file ownership." },
  { icon: Search, title: "Advanced Search", desc: "Find any file in milliseconds with full-text search across content and metadata." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2, GDPR-ready, SSO, audit logs, and 256-bit AES encryption." },
];

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "99.99%", label: "Platform Uptime" },
  { value: "1M+", label: "Files Managed" },
  { value: "256-bit", label: "Encryption" },
];

const steps = [
  { n: "01", t: "Create Account", d: "Sign up in seconds with Google or email — no credit card required." },
  { n: "02", t: "Upload Files", d: "Drag and drop or use the API. Any file type, any size, fully encrypted." },
  { n: "03", t: "Collaborate Securely", d: "Share folders, manage permissions, and work together in real time." },
  { n: "04", t: "Access Anywhere", d: "Reach your files from any device, anywhere in the world, with one login." },
];

const plans = [
  {
    name: "Free", price: "₹0", period: "/month", tagline: "For getting started",
    features: ["Limited storage", "Basic sharing", "Secure uploads", "Email support"],
    cta: "Start Free", highlight: false,
  },
  {
    name: "Personal", price: "₹199", period: "/month", tagline: "For power users",
    features: ["Increased storage", "Version history", "Priority support", "Password-protected links"],
    cta: "Get Personal", highlight: true,
  },
  {
    name: "Business", price: "₹799", period: "/month", tagline: "For growing teams",
    features: ["Team management", "Shared workspaces", "Activity logs", "Advanced security"],
    cta: "Get Business", highlight: false,
  },
  {
    name: "Enterprise", price: "Custom", period: "", tagline: "For organizations",
    features: ["Custom storage", "Dedicated support", "SSO & SAML", "SLA & contracts"],
    cta: "Contact Sales", highlight: false,
  },
];

const testimonials = [
  { n: "Priya Sharma", r: "Operations Lead, Northpeak", q: "We migrated our entire document workflow to CloudFile in a weekend. The sharing controls and audit log alone justified the switch." },
  { n: "Daniel Okafor", r: "CTO, Vexa Logistics", q: "Reliability has been flawless across nine months. Real-time sync just works, and our compliance team signed off without hesitation." },
  { n: "Sara Müller", r: "Founder, Pixel & Co", q: "It feels like Linear and Notion designed a cloud storage product together. Fast, quiet, and out of the way." },
];

const faqs = [
  { q: "How secure is CloudFile?", a: "Every file is encrypted in transit with TLS 1.3 and at rest with AES-256. We hold SOC 2 Type II controls, support two-factor authentication, and offer SSO on Business and Enterprise plans." },
  { q: "Can I share files with non-users?", a: "Yes. Generate a secure link with optional password, expiration date, and download limits. Recipients don't need a CloudFile account to view or download." },
  { q: "Is my data encrypted?", a: "Yes — end-to-end. Files are encrypted before they leave your device and remain encrypted on our servers. Only authorized recipients can decrypt them." },
  { q: "Can I access files from multiple devices?", a: "Absolutely. CloudFile syncs in real time across web, desktop, and mobile. Sign in once and your files are everywhere you are." },
  { q: "What happens if I exceed storage limits?", a: "You'll get an in-app notification well before you hit your cap. Existing files remain accessible — you simply can't upload new ones until you upgrade or free up space." },
  { q: "Do you offer business plans?", a: "Yes. Our Business plan includes shared workspaces, admin controls, and activity logs. Enterprise adds SSO, SAML, custom contracts, and a dedicated success manager." },
];

function Landing() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setAuthed(!!session?.user));
    return () => subscription.unsubscribe();
  }, []);

  const handleStart = () => navigate({ to: authed ? "/dashboard" : "/auth" });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#E2E8F0]">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><Logo size={32} /></Link>

          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-[#475569]">
            <Link to="/" hash="features" className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors">Features</Link>
            <Link to="/security" className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors">Security</Link>
            <Link to="/" hash="pricing" className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors">Pricing</Link>

            <div className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
              <button className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center gap-1">
                Solutions <ChevronDown className="size-3.5" />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-white rounded-xl border border-[#E2E8F0] shadow-lg p-2">
                    {[
                      { t: "Personal Storage", d: "For individuals" },
                      { t: "Team Collaboration", d: "For small teams" },
                      { t: "Business Storage", d: "For growing companies" },
                      { t: "Enterprise", d: "For large organizations" },
                    ].map((s) => (
                      <Link key={s.t} to="/" hash="pricing" className="block px-3 py-2 rounded-lg hover:bg-[#F1F5F9]">
                        <div className="text-sm font-semibold text-[#0F172A]">{s.t}</div>
                        <div className="text-xs text-[#64748B]">{s.d}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
              <button className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center gap-1">
                Resources <ChevronDown className="size-3.5" />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-lg p-2">
                    <Link to="/documentation" className="block px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-sm font-medium">Documentation</Link>
                    <Link to="/resources" className="block px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-sm font-medium">API</Link>
                    <Link to="/help-center" className="block px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-sm font-medium">Help Center</Link>
                    <Link to="/resources" className="block px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-sm font-medium">Blog</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/" hash="faq" className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/auth" className="hidden sm:inline-flex h-9 px-4 items-center text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors">
              Sign In
            </Link>
            <button
              onClick={handleStart}
              className="h-9 px-4 rounded-lg bg-[#0F172A] text-white font-semibold text-sm hover:bg-[#1E293B] transition-colors"
            >
              Get Started
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 -mr-2" aria-label="Menu">
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white">
            <div className="px-6 py-4 space-y-1 text-sm font-medium">
              {[["Features", "/", "features"], ["Security", "/security", undefined], ["Pricing", "/", "pricing"], ["FAQ", "/", "faq"], ["Documentation", "/documentation", undefined], ["Help Center", "/help-center", undefined]].map(([label, to, hash]) => (
                <Link key={label} to={to as string} hash={hash as string | undefined} onClick={() => setMobileOpen(false)} className="block py-2 text-[#475569] hover:text-[#0F172A]">{label}</Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_top,#E0F2FE,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#475569] mb-8">
            <Sparkles className="size-3.5 text-[#0EA5E9]" />
            Trusted by 10,000+ teams worldwide
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Secure Cloud Storage Built for <span className="text-[#0EA5E9]">Modern Teams</span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] mt-6 max-w-2xl mx-auto leading-relaxed">
            Store, organize, share and access your files from anywhere with enterprise-grade security, lightning-fast performance, and seamless collaboration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <button onClick={handleStart} className="h-12 px-7 rounded-lg bg-[#0F172A] text-white font-semibold flex items-center gap-2 hover:bg-[#1E293B] transition-colors">
              Start Free <ArrowRight className="size-4" />
            </button>
            <a href="#features" className="h-12 px-7 rounded-lg bg-white border border-[#E2E8F0] font-semibold flex items-center gap-2 hover:border-[#CBD5E1] transition-colors">
              Watch Demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#475569]">
            {["End-to-End Encryption", "Secure Sharing", "Global Access", "Enterprise Ready"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-[#0EA5E9]" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]">{s.value}</div>
              <div className="text-sm text-[#64748B] mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs font-semibold tracking-widest text-[#0EA5E9] uppercase mb-3">Features</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to manage files at scale</h2>
          <p className="text-[#475569] mt-4">A complete cloud platform engineered for security, speed, and collaboration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#94A3B8] hover:shadow-sm transition-[border-color,box-shadow,background-color]">
              <div className="size-10 rounded-lg bg-[#F1F5F9] text-[#0F172A] grid place-items-center mb-4">
                <f.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-base text-[#0F172A]">{f.title}</h3>
              <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[#E2E8F0] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs font-semibold tracking-widest text-[#0EA5E9] uppercase mb-3">How it works</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">From sign-up to sync in minutes</h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-[#E2E8F0]" />
            {steps.map((s) => (
              <div key={s.n} className="relative bg-white">
                <div className="size-12 rounded-full bg-[#0F172A] text-white grid place-items-center font-bold text-sm mx-auto md:mx-0 relative z-10">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg mt-5 text-[#0F172A]">{s.t}</h3>
                <p className="text-sm text-[#64748B] mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs font-semibold tracking-widest text-[#0EA5E9] uppercase mb-3">Pricing</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Simple pricing that scales with you</h2>
          <p className="text-[#475569] mt-4">All prices in Indian Rupees (₹). Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                p.highlight
                  ? "bg-[#0F172A] text-white border border-[#0F172A]"
                  : "bg-white text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0EA5E9] text-white text-[10px] font-bold tracking-widest uppercase">
                  Most popular
                </div>
              )}
              <div className={`text-xs font-semibold tracking-widest uppercase ${p.highlight ? "text-[#0EA5E9]" : "text-[#64748B]"}`}>{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-white/60" : "text-[#64748B]"}`}>{p.period}</span>
              </div>
              <div className={`mt-1 text-sm ${p.highlight ? "text-white/80" : "text-[#64748B]"}`}>{p.tagline}</div>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`size-4 shrink-0 mt-0.5 ${p.highlight ? "text-[#0EA5E9]" : "text-[#0EA5E9]"}`} />
                    <span className={p.highlight ? "text-white/90" : "text-[#475569]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={p.name === "Enterprise" ? () => navigate({ to: "/contact" }) : handleStart}
                className={`mt-7 w-full h-11 rounded-lg font-semibold text-sm transition-colors ${
                  p.highlight
                    ? "bg-white text-[#0F172A] hover:bg-[#F1F5F9]"
                    : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y border-[#E2E8F0] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs font-semibold tracking-widest text-[#0EA5E9] uppercase mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built for teams that ship</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.n} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-7">
                <p className="text-[#0F172A] leading-relaxed">"{t.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#0F172A] text-white grid place-items-center font-semibold text-sm">
                    {t.n.split(" ").map((x) => x[0]).join("")}
                  </div>
                  <div className="leading-tight">
                    <div className="font-semibold text-sm text-[#0F172A]">{t.n}</div>
                    <div className="text-xs text-[#64748B]">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest text-[#0EA5E9] uppercase mb-3">FAQ</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
              <summary className="cursor-pointer flex items-center justify-between font-semibold text-[#0F172A] list-none px-5 py-4 hover:bg-[#F8FAFC]">
                {f.q}
                <ChevronDown className="size-4 text-[#64748B] transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-[#475569] px-5 pb-5 leading-relaxed text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-[#0F172A] text-white p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_top_right,#0EA5E9,transparent_50%),radial-gradient(ellipse_at_bottom_left,#1E293B,transparent_60%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
              Ready to Secure Your Files?
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              Join thousands of users who trust CloudFile to manage and protect their digital assets.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button onClick={handleStart} className="h-12 px-7 rounded-lg bg-white text-[#0F172A] font-semibold hover:bg-[#F1F5F9] transition-colors">
                Start Free
              </button>
              <Link to="/contact" className="h-12 px-7 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Logo size={28} />
              <p className="text-sm text-[#64748B] mt-4 max-w-xs">Secure cloud storage built for modern teams.</p>
            </div>
            {[
              { title: "Product", links: [["Features", "/", "features"], ["Pricing", "/", "pricing"], ["Security", "/security"], ["Enterprise", "/", "pricing"]] },
              { title: "Resources", links: [["Documentation", "/documentation"], ["API", "/resources"], ["Help Center", "/help-center"], ["Blog", "/resources"]] },
              { title: "Company", links: [["About Us", "/about"], ["Careers", "/about"], ["Contact", "/contact"]] },
              { title: "Legal", links: [["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms-of-service"], ["Cookie Policy", "/cookie-policy"]] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold tracking-widest uppercase text-[#0F172A] mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l[0]}>
                      <Link to={l[1]} hash={l[2]} className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">{l[0]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#64748B]">© 2026 CloudFile. All rights reserved.</div>
            <div className="flex items-center gap-2">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-lg border border-[#E2E8F0] grid place-items-center text-[#64748B] hover:text-[#0F172A] hover:border-[#94A3B8] transition-colors" aria-label="Social link">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
