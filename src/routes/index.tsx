import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Cloud,
  Shield,
  Zap,
  Share2,
  FolderTree,
  RefreshCw,
  Check,
  ArrowRight,
  Lock,
  Sparkles,
  Upload,
  Users,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CloudFile — Premium cloud storage for teams & creators" },
      { name: "description", content: "Upload, organize, sync and share files securely. End-to-end encrypted cloud storage with real-time sync and AWS S3 reliability." },
      { property: "og:title", content: "CloudFile — Premium cloud storage" },
      { property: "og:description", content: "Secure, fast, beautifully designed cloud storage with real-time sync and sharing." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Upload, title: "Lightning fast uploads", desc: "Drag, drop, and your files are instantly synced to encrypted cloud storage." },
  { icon: Shield, title: "End-to-end encryption", desc: "Your files are encrypted at rest and in transit. Only you hold the keys." },
  { icon: Share2, title: "Smart sharing", desc: "Password-protected links, expirations, and granular permissions per recipient." },
  { icon: FolderTree, title: "Folder organization", desc: "Nest folders, star favorites, and keep your workspace organized." },
  { icon: RefreshCw, title: "Real-time sync", desc: "Changes appear instantly on every device — phone, tablet, desktop." },
  { icon: Zap, title: "Built on AWS S3", desc: "Enterprise-grade reliability with 99.999999999% durability." },
];

const plans = [
  { name: "Free", price: "$0", period: "/forever", storage: "200 GB", features: ["Personal use", "5 GB per file", "Basic sharing"], cta: "Get started", highlight: false },
  { name: "Pro", price: "$9", period: "/month", storage: "1 TB", features: ["Everything in Free", "Password-protected links", "Version history", "Priority support"], cta: "Start free trial", highlight: true },
  { name: "Business", price: "$24", period: "/user/mo", storage: "5 TB", features: ["Team workspaces", "Admin controls", "Activity logs", "SAML SSO"], cta: "Start free trial", highlight: false },
  { name: "Enterprise", price: "Custom", period: "", storage: "Unlimited", features: ["Dedicated support", "Custom contracts", "On-prem option", "Advanced security"], cta: "Contact sales", highlight: false },
];

const faqs = [
  { q: "Is my data secure?", a: "Yes — all files are encrypted in transit (TLS 1.3) and at rest (AES-256). You can also enable two-factor authentication." },
  { q: "Can I share files with non-users?", a: "Absolutely. Generate public or password-protected links with optional expiration dates." },
  { q: "What file types are supported?", a: "All of them — images, videos, PDFs, Office docs, audio, ZIPs and more, up to 5 GB per file on Free." },
  { q: "Can I cancel anytime?", a: "Yes, plans are month-to-month and you can downgrade or cancel any time from settings." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Cloud className="size-5 text-white" />
            </div>
            <span className="font-bold text-lg">CloudFile</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link
              to="/dashboard"
              className="h-10 px-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 shadow-elegant hover:opacity-95 transition-opacity"
            >
              Get Started <ArrowRight className="size-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-hero">
        <div className="absolute inset-0 opacity-30 pointer-events-none [background:radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/80 text-xs font-medium text-primary mb-8 shadow-sm">
            <Sparkles className="size-3.5" />
            Now with real-time sync and AWS S3 backbone
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.05]">
            Your files, beautifully <span className="bg-gradient-primary bg-clip-text text-transparent">in the cloud.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Premium cloud storage to upload, organize, sync, and securely share files across every device. Built for creators, teams, and everyone in between.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <Link
              to="/dashboard"
              className="h-12 px-6 rounded-xl bg-gradient-primary text-primary-foreground font-semibold flex items-center gap-2 shadow-elegant hover:shadow-glow transition-shadow"
            >
              Start free — 200 GB <ArrowRight className="size-4" />
            </Link>
            <a
              href="#pricing"
              className="h-12 px-6 rounded-xl bg-card border border-border font-semibold flex items-center gap-2 hover:bg-muted transition-colors"
            >
              See pricing
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> No credit card</span>
            <span className="flex items-center gap-1.5"><Lock className="size-3.5 text-success" /> End-to-end encrypted</span>
            <span className="flex items-center gap-1.5"><Zap className="size-3.5 text-success" /> Real-time sync</span>
          </div>

          {/* Hero preview */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl bg-card border border-border shadow-elegant p-2">
              <div className="rounded-2xl overflow-hidden bg-gradient-hero p-6 md:p-10">
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {[
                    { i: Cloud, l: "Storage Used", v: "68.4 GB" },
                    { i: Users, l: "Shared", v: "156" },
                    { i: Star, l: "Starred", v: "42" },
                  ].map((c) => (
                    <div key={c.l} className="bg-card rounded-2xl p-4 md:p-5 shadow-card text-left">
                      <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
                        <c.i className="size-5" />
                      </div>
                      <div className="text-xs text-muted-foreground">{c.l}</div>
                      <div className="text-xl md:text-2xl font-bold mt-1">{c.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="text-sm font-semibold text-primary mb-2">FEATURES</div>
          <h2 className="text-4xl md:text-5xl font-bold">Everything you need, nothing you don't</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A complete cloud platform designed for speed, security, and simplicity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="group bg-card rounded-2xl p-7 border border-border/60 hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="size-12 rounded-2xl bg-gradient-primary text-white grid place-items-center mb-5 shadow-card group-hover:shadow-glow transition-shadow">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-sm font-semibold text-primary mb-2">HOW IT WORKS</div>
            <h2 className="text-4xl md:text-5xl font-bold">Get started in 3 simple steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Create your account", d: "Sign up with email or Google in seconds. Get 200 GB free, forever." },
              { n: "02", t: "Upload your files", d: "Drag and drop, or pick from your device. Any file, any size." },
              { n: "03", t: "Sync, share, repeat", d: "Access from anywhere, share with anyone, with total control." },
            ].map((s) => (
              <div key={s.n} className="bg-card rounded-2xl p-8 shadow-card border border-border/60 relative overflow-hidden">
                <div className="text-7xl font-black bg-gradient-primary bg-clip-text text-transparent opacity-30 absolute top-2 right-4">
                  {s.n}
                </div>
                <h3 className="text-xl font-bold mt-6">{s.t}</h3>
                <p className="text-muted-foreground mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="text-sm font-semibold text-primary mb-2">PRICING</div>
          <h2 className="text-4xl md:text-5xl font-bold">Plans that scale with you</h2>
          <p className="text-muted-foreground mt-4">Start free. Upgrade anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${
                p.highlight
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-elegant"
                  : "bg-card border-border/60 shadow-card"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-primary text-xs font-bold shadow-card">
                  Most popular
                </div>
              )}
              <h3 className="font-bold text-lg">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-white/80" : "text-muted-foreground"}`}>{p.period}</span>
              </div>
              <div className={`mt-1 text-sm font-medium ${p.highlight ? "text-white/90" : "text-primary"}`}>
                {p.storage} storage
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`size-4 shrink-0 mt-0.5 ${p.highlight ? "text-white" : "text-success"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-7 w-full h-11 rounded-xl font-semibold text-sm transition-opacity ${
                  p.highlight
                    ? "bg-white text-primary hover:opacity-95"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold">Loved by teams everywhere</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: "Maya Patel", r: "Designer, Lumen Studio", q: "CloudFile replaced three tools for us. The sharing controls alone are worth it." },
              { n: "Daniel Okafor", r: "CTO, Northwind", q: "Snappy, secure, and our team actually enjoys using it. That's rare." },
              { n: "Sara Müller", r: "Founder, Pixel & Co", q: "Beautifully designed and the real-time sync just works. No more 'final_v3.pdf'." },
            ].map((t) => (
              <div key={t.n} className="bg-card rounded-2xl p-7 shadow-card border border-border/60">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-primary text-white grid place-items-center font-bold text-sm">
                    {t.n.split(" ").map((x) => x[0]).join("")}
                  </div>
                  <div className="leading-tight">
                    <div className="font-semibold text-sm">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-card rounded-2xl border border-border/60 p-6 shadow-card open:shadow-elegant">
              <summary className="cursor-pointer flex items-center justify-between font-semibold list-none">
                {f.q}
                <ArrowRight className="size-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-12 md:p-16 text-center shadow-elegant relative overflow-hidden">
          <Cloud className="absolute -top-8 -right-8 size-48 opacity-15" />
          <Cloud className="absolute -bottom-12 -left-8 size-40 opacity-10" />
          <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Ready to take control of your files?
          </h2>
          <p className="mt-4 text-white/85 max-w-xl mx-auto">
            Join thousands of teams already storing, syncing, and sharing with CloudFile.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 mt-8 h-12 px-7 rounded-xl bg-white text-primary font-semibold shadow-elegant hover:shadow-glow transition-shadow"
          >
            Get started free <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center">
              <Cloud className="size-4 text-white" />
            </div>
            <span className="font-bold">CloudFile</span>
            <span className="text-xs text-muted-foreground ml-2">© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
