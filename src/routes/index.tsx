import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Shield, Share2, RefreshCw, Check, ArrowRight, Lock, History, Users, Search, Globe,
  Server, ChevronDown, Menu, X, Github, Linkedin, Twitter, Sparkles, CheckCircle2,
  HardDrive, KeyRound, Link2, ShieldCheck, Eye, Activity, FolderUp, Settings2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CloudFile — Enterprise Cloud Storage Built for Secure Collaboration" },
      { name: "description", content: "Store, organize, share and manage files with enterprise-grade security, AWS S3 reliability and lightning-fast global access." },
      { property: "og:title", content: "CloudFile — Enterprise Cloud Storage" },
      { property: "og:description", content: "Enterprise cloud storage built on AWS S3 with AES-256 encryption, secure sharing and global access." },
      { property: "og:url", content: "https://cloud-file.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/" }],
  }),
  component: Landing,
});

const infrastructure = [
  { icon: HardDrive, title: "AWS S3 Storage", desc: "Highly durable object storage with scalable architecture." },
  { icon: Lock, title: "AES-256 Encryption", desc: "Files encrypted at rest and in transit." },
  { icon: Link2, title: "Secure Sharing", desc: "Protected links, access control and granular permissions." },
  { icon: Globe, title: "Global Access", desc: "Access files securely from anywhere on any device." },
];

const features = [
  { icon: Server, title: "Cloud Storage", desc: "Store files securely with scalable AWS-backed infrastructure." },
  { icon: RefreshCw, title: "Real-Time Sync", desc: "Access updated files across devices instantly." },
  { icon: Share2, title: "Secure File Sharing", desc: "Create protected links with passwords and permissions." },
  { icon: History, title: "Version History", desc: "Restore previous versions with confidence." },
  { icon: Users, title: "Team Collaboration", desc: "Collaborate securely with shared workspaces." },
  { icon: Search, title: "Smart Search", desc: "Find files instantly with metadata indexing." },
  { icon: Lock, title: "Access Control", desc: "Manage user roles and granular permissions." },
  { icon: Shield, title: "Enterprise Security", desc: "Advanced security standards and encryption." },
];

const security = [
  { icon: Lock, title: "AES-256 Encryption", desc: "Industry-standard encryption for data at rest and in transit." },
  { icon: KeyRound, title: "Secure Authentication", desc: "OAuth, SSO and modern session-based authentication." },
  { icon: ShieldCheck, title: "Private File Access", desc: "Files isolated per user with strict access boundaries." },
  { icon: HardDrive, title: "AWS S3 Reliability", desc: "99.999999999% object durability with multi-AZ replication." },
  { icon: Users, title: "Role-Based Permissions", desc: "Define who can view, edit or share at every level." },
  { icon: Eye, title: "Activity Monitoring", desc: "Real-time audit logs of every file action." },
];

const steps = [
  { n: "01", t: "Upload Securely", d: "Drag, drop, and your files are encrypted on the way to S3." },
  { n: "02", t: "Organize Workspaces", d: "Folders, tags and shared workspaces, your way." },
  { n: "03", t: "Share with Control", d: "Generate protected links with permissions and expiry." },
  { n: "04", t: "Access Anywhere", d: "Reach your files from any device, globally, instantly." },
];

const plans = [
  { name: "Starter", price: "₹0", period: "/forever", tagline: "For personal use",
    features: ["5GB Storage", "Basic Sharing", "Personal Workspace", "Email Support"], cta: "Start Free", highlight: false },
  { name: "Pro", price: "₹199", period: "/month", tagline: "For power users",
    features: ["100GB Storage", "Version History", "Password-Protected Links", "Priority Support"], cta: "Get Pro", highlight: true },
  { name: "Business", price: "₹799", period: "/month", tagline: "For growing teams",
    features: ["1TB Storage", "Team Collaboration", "Advanced Permissions", "Activity Logs"], cta: "Get Business", highlight: false },
  { name: "Enterprise", price: "Custom", period: "", tagline: "For organizations",
    features: ["Unlimited Scalability", "Dedicated Support", "Custom Contracts", "Priority Infrastructure"], cta: "Contact Sales", highlight: false },
];

const trustPoints = [
  { icon: HardDrive, title: "AWS S3 Powered Storage" },
  { icon: Lock, title: "End-to-End Encryption" },
  { icon: Share2, title: "Secure Sharing Controls" },
  { icon: Globe, title: "Global File Access" },
  { icon: History, title: "Version History Protection" },
  { icon: Users, title: "Team Collaboration" },
];

const faqs = [
  { q: "How secure are my files?", a: "Files are encrypted in transit with TLS 1.3 and at rest with AES-256. Access is governed by per-user authentication and strict isolation policies." },
  { q: "Is my data encrypted?", a: "Yes. Every byte is encrypted at rest using AES-256, and transit is protected by TLS 1.3 end-to-end." },
  { q: "Where are files stored?", a: "Files are stored in highly durable AWS S3 object storage with multi-AZ replication and 99.999999999% durability." },
  { q: "Can I share files externally?", a: "Yes. Generate secure shareable links with optional passwords, expiration dates and download limits." },
  { q: "How does version history work?", a: "Pro and Business plans retain previous versions, so you can roll back to any earlier state of a file." },
  { q: "Do you support teams?", a: "Business and Enterprise plans include shared workspaces, role-based permissions and activity logs." },
];

function Landing() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setAuthed(!!session?.user));
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { subscription.unsubscribe(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const handleStart = () => navigate({ to: authed ? "/dashboard" : "/auth" });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden font-sans">
      {/* Navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-white/85 border-b border-[#E2E8F0] shadow-[0_4px_24px_-12px_rgba(15,23,42,0.08)]" : "bg-white/60 border-b border-transparent"}`}>
        <nav className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
          <Link to="/" aria-label="CloudFile home"><Logo size={40} /></Link>

          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-[#475569]">
            <Link to="/" hash="features" className="px-3 py-2 rounded-lg hover:text-[#1E5EFF] hover:bg-[#EFF6FF] transition-colors">Features</Link>
            <Link to="/security" className="px-3 py-2 rounded-lg hover:text-[#1E5EFF] hover:bg-[#EFF6FF] transition-colors">Security</Link>
            <Link to="/" hash="pricing" className="px-3 py-2 rounded-lg hover:text-[#1E5EFF] hover:bg-[#EFF6FF] transition-colors">Pricing</Link>
            <div className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
              <button className="px-3 py-2 rounded-lg hover:text-[#1E5EFF] hover:bg-[#EFF6FF] transition-colors flex items-center gap-1">
                Solutions <ChevronDown className="size-3.5" />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-white rounded-xl border border-[#E2E8F0] shadow-xl p-2">
                    {[
                      { t: "Personal Storage", d: "For individuals" },
                      { t: "Team Collaboration", d: "For small teams" },
                      { t: "Business Storage", d: "For growing companies" },
                      { t: "Enterprise", d: "For large organizations" },
                    ].map((s) => (
                      <Link key={s.t} to="/" hash="pricing" className="block px-3 py-2 rounded-lg hover:bg-[#EFF6FF]">
                        <div className="text-sm font-semibold text-[#0F172A]">{s.t}</div>
                        <div className="text-xs text-[#64748B]">{s.d}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
              <button className="px-3 py-2 rounded-lg hover:text-[#1E5EFF] hover:bg-[#EFF6FF] transition-colors flex items-center gap-1">
                Resources <ChevronDown className="size-3.5" />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-xl p-2">
                    <Link to="/documentation" className="block px-3 py-2 rounded-lg hover:bg-[#EFF6FF] text-sm font-medium">Documentation</Link>
                    <Link to="/resources" className="block px-3 py-2 rounded-lg hover:bg-[#EFF6FF] text-sm font-medium">API</Link>
                    <Link to="/help-center" className="block px-3 py-2 rounded-lg hover:bg-[#EFF6FF] text-sm font-medium">Help Center</Link>
                    <Link to="/resources" className="block px-3 py-2 rounded-lg hover:bg-[#EFF6FF] text-sm font-medium">Blog</Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/" hash="faq" className="px-3 py-2 rounded-lg hover:text-[#1E5EFF] hover:bg-[#EFF6FF] transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/auth" className="hidden sm:inline-flex h-10 px-4 items-center text-sm font-semibold text-[#0F172A] hover:text-[#1E5EFF] rounded-lg transition-colors">
              Sign In
            </Link>
            <button
              onClick={handleStart}
              className="h-10 px-5 rounded-lg text-white font-semibold text-sm transition-all duration-200 shadow-[0_8px_20px_-8px_rgba(30,94,255,0.55)] hover:shadow-[0_10px_24px_-6px_rgba(30,94,255,0.65)] hover:-translate-y-px"
              style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF 0%, #4DA3FF 100%)" }}
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
                <Link key={label} to={to as string} hash={hash as string | undefined} onClick={() => setMobileOpen(false)} className="block py-2.5 text-[#475569] hover:text-[#1E5EFF]">{label}</Link>
              ))}
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[#0F172A] font-semibold">Sign In</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" }} />
        <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(ellipse_at_top,#DBEAFE,transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DBEAFE] text-xs font-medium text-[#1E5EFF] mb-8 shadow-[0_2px_8px_-2px_rgba(30,94,255,0.15)]">
            <Sparkles className="size-3.5" />
            Built on AWS S3 · AES-256 encrypted
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl mx-auto">
            Enterprise Cloud Storage<br />
            Built for{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF, #7DD3FC)" }}>
              Secure Collaboration
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] mt-6 max-w-2xl mx-auto leading-relaxed">
            Store, organize, share and manage files with enterprise-grade security, AWS S3 reliability and lightning-fast global access.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <button onClick={handleStart} className="h-12 px-7 rounded-lg text-white font-semibold flex items-center gap-2 transition-all duration-200 shadow-[0_12px_30px_-10px_rgba(30,94,255,0.6)] hover:-translate-y-px"
              style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF 0%, #4DA3FF 100%)" }}>
              Get Started Free <ArrowRight className="size-4" />
            </button>
            <a href="#features" className="h-12 px-7 rounded-lg bg-white border border-[#E2E8F0] font-semibold text-[#0F172A] flex items-center gap-2 hover:border-[#1E5EFF] hover:text-[#1E5EFF] transition-colors">
              View Demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#475569]">
            {["End-to-End Encryption", "Secure Sharing", "Global Access", "Enterprise Ready"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-[#1E5EFF]" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">Infrastructure</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built on Modern Cloud Infrastructure</h2>
          <p className="text-[#475569] mt-4">The reliability of AWS. The security of modern encryption. The simplicity of CloudFile.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {infrastructure.map((s) => (
            <div key={s.title} className="group relative bg-white/80 backdrop-blur border border-[#E2E8F0] rounded-2xl p-6 hover:-translate-y-1 hover:border-[#4DA3FF] hover:shadow-[0_20px_40px_-20px_rgba(30,94,255,0.35)] transition-all duration-300">
              <div className="size-12 rounded-xl grid place-items-center mb-4 text-white shadow-[0_8px_16px_-6px_rgba(30,94,255,0.5)]"
                style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF, #4DA3FF)" }}>
                <s.icon className="size-5" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-base text-[#0F172A]">{s.title}</h3>
              <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white border-y border-[#E2E8F0] py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">Features</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to manage files at scale</h2>
            <p className="text-[#475569] mt-4">A complete cloud platform engineered for security, speed, and collaboration.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#4DA3FF] hover:bg-white hover:shadow-[0_12px_30px_-16px_rgba(30,94,255,0.3)] transition-all duration-300">
                <div className="size-11 rounded-xl bg-[#EFF6FF] text-[#1E5EFF] grid place-items-center mb-4">
                  <f.icon className="size-5" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-base text-[#0F172A]">{f.title}</h3>
                <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">Security</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Security Comes First</h2>
          <p className="text-[#475569] mt-4">Multiple layers of protection so your files stay yours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {security.map((s) => (
            <div key={s.title} className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#1E5EFF] transition-colors">
              <div className="absolute -right-8 -top-8 size-24 rounded-full opacity-10" style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF, #7DD3FC)" }} />
              <div className="relative size-11 rounded-xl grid place-items-center mb-4 text-white"
                style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF, #4DA3FF)" }}>
                <s.icon className="size-5" strokeWidth={2} />
              </div>
              <h3 className="relative font-semibold text-base text-[#0F172A]">{s.title}</h3>
              <p className="relative text-sm text-[#64748B] mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[#E2E8F0] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">How it works</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How CloudFile Works</h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px" style={{ background: "linear-gradient(90deg, #1E5EFF, #7DD3FC)" }} />
            {steps.map((s) => (
              <div key={s.n} className="relative bg-white text-center md:text-left">
                <div className="size-14 rounded-full grid place-items-center font-bold text-white text-sm mx-auto md:mx-0 relative z-10 shadow-[0_10px_24px_-8px_rgba(30,94,255,0.55)]"
                  style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF, #4DA3FF)" }}>
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
          <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">Pricing</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Simple pricing that scales with you</h2>
          <p className="text-[#475569] mt-4">All prices in Indian Rupees (₹). Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
              p.highlight
                ? "text-white border border-transparent shadow-[0_30px_60px_-20px_rgba(30,94,255,0.55)] -translate-y-1"
                : "bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#4DA3FF] hover:shadow-[0_20px_40px_-20px_rgba(30,94,255,0.25)]"
            }`}
              style={p.highlight ? { backgroundImage: "linear-gradient(135deg, #1E5EFF 0%, #4DA3FF 100%)" } : undefined}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-[#1E5EFF] text-[10px] font-bold tracking-widest uppercase shadow-sm">
                  Most popular
                </div>
              )}
              <div className={`text-xs font-semibold tracking-widest uppercase ${p.highlight ? "text-white/90" : "text-[#64748B]"}`}>{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-white/70" : "text-[#64748B]"}`}>{p.period}</span>
              </div>
              <div className={`mt-1 text-sm ${p.highlight ? "text-white/85" : "text-[#64748B]"}`}>{p.tagline}</div>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`size-4 shrink-0 mt-0.5 ${p.highlight ? "text-white" : "text-[#1E5EFF]"}`} />
                    <span className={p.highlight ? "text-white/95" : "text-[#475569]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={p.name === "Enterprise" ? () => navigate({ to: "/contact" }) : handleStart}
                className={`mt-7 w-full h-11 rounded-lg font-semibold text-sm transition-all ${
                  p.highlight ? "bg-white text-[#1E5EFF] hover:bg-[#F1F5F9]"
                  : "text-white hover:-translate-y-px"
                }`}
                style={p.highlight ? undefined : { backgroundImage: "linear-gradient(135deg, #1E5EFF 0%, #4DA3FF 100%)" }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why teams choose CloudFile */}
      <section className="bg-white border-y border-[#E2E8F0] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">Why CloudFile</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Teams Choose CloudFile</h2>
            <p className="text-[#475569] mt-4">Real capabilities. No fluff. The features modern teams need every day.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trustPoints.map((t) => (
              <div key={t.title} className="flex items-center gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#4DA3FF] transition-colors">
                <div className="size-11 rounded-xl grid place-items-center text-white shrink-0"
                  style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF, #4DA3FF)" }}>
                  <t.icon className="size-5" strokeWidth={2} />
                </div>
                <div className="font-semibold text-sm md:text-base text-[#0F172A]">{t.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest text-[#1E5EFF] uppercase mb-3">FAQ</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-2.5">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#4DA3FF] transition-colors">
              <summary className="cursor-pointer flex items-center justify-between font-semibold text-[#0F172A] list-none px-5 py-4 hover:bg-[#EFF6FF]/50">
                {f.q}
                <ChevronDown className="size-4 text-[#1E5EFF] transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-[#475569] px-5 pb-5 leading-relaxed text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden text-white"
          style={{ backgroundImage: "linear-gradient(135deg, #1E5EFF 0%, #4DA3FF 100%)" }}>
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_top_right,#7DD3FC,transparent_55%),radial-gradient(ellipse_at_bottom_left,#1E5EFF,transparent_60%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
              Ready to Secure Your Files?
            </h2>
            <p className="mt-4 text-white/85 max-w-xl mx-auto">
              Cloud storage built for modern teams, businesses and professionals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button onClick={handleStart} className="h-12 px-7 rounded-lg bg-white text-[#1E5EFF] font-semibold hover:bg-[#F1F5F9] transition-colors shadow-lg">
                Start Free
              </button>
              <Link to="/contact" className="h-12 px-7 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center">
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
              <Logo size={36} />
              <p className="text-sm text-[#64748B] mt-4 max-w-xs leading-relaxed">Secure cloud storage built for modern teams.</p>
            </div>
            {[
              { title: "Product", links: [["Features", "/", "features"], ["Pricing", "/", "pricing"], ["Security", "/security"], ["Enterprise", "/", "pricing"]] },
              { title: "Resources", links: [["Documentation", "/documentation"], ["API", "/resources"], ["Support", "/help-center"], ["Blog", "/resources"]] },
              { title: "Company", links: [["About", "/about"], ["Careers", "/about"], ["Contact", "/contact"]] },
              { title: "Legal", links: [["Privacy", "/privacy-policy"], ["Terms", "/terms-of-service"], ["Cookies", "/cookie-policy"]] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold tracking-widest uppercase text-[#0F172A] mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l[0]}>
                      <Link to={l[1]} hash={l[2]} className="text-sm text-[#64748B] hover:text-[#1E5EFF] transition-colors">{l[0]}</Link>
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
                <a key={i} href="#" className="size-9 rounded-lg border border-[#E2E8F0] grid place-items-center text-[#64748B] hover:text-[#1E5EFF] hover:border-[#4DA3FF] transition-colors" aria-label="Social link">
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
