import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Github, ExternalLink, Mail, Star, GitFork, Code2, Server, Database, Wrench } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahmed Elbaz — Full Stack Developer" },
      { name: "description", content: "Portfolio of Ahmed Elbaz, full stack developer specialized in PHP, Laravel and modern web technologies." },
      { property: "og:title", content: "Ahmed Elbaz — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of Ahmed Elbaz, full stack developer specialized in PHP, Laravel and modern web technologies." },
    ],
  }),
  component: Index,
});

const GITHUB_USER = "AhmedYasser2019";

type GhUser = { public_repos: number; followers: number; following: number; avatar_url: string; bio: string; name: string; html_url: string; created_at: string };
type GhRepo = { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; forks_count: number; updated_at: string; fork: boolean };

function Index() {
  const { data: user } = useQuery<GhUser>({
    queryKey: ["gh-user"],
    queryFn: () => fetch(`https://api.github.com/users/${GITHUB_USER}`).then((r) => r.json()),
  });
  const { data: repos } = useQuery<GhRepo[]>({
    queryKey: ["gh-repos"],
    queryFn: () => fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`).then((r) => r.json()),
  });

  const visibleRepos = (repos ?? []).filter((r) => !r.fork);
  const yearsCoding = user ? new Date().getFullYear() - new Date(user.created_at).getFullYear() : 7;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-lg font-bold tracking-tight">
            <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">Ahmed.</span>Elbaz
          </a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs font-medium hover:border-primary transition-colors"
          >
            <Github className="size-4" /> GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-surface)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
                Available for work
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                Hi, I'm <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">{user?.name ?? "Ahmed Elbaz"}</span>
                <br />
                Full Stack Developer
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                {user?.bio ?? "Never Give Up"} — I craft robust web applications with PHP, Laravel, and modern JavaScript. {yearsCoding}+ years building things on the web.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-[image:var(--gradient-hero)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition-opacity"
                >
                  View my work
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold hover:border-primary transition-colors"
                >
                  Get in touch
                </a>
              </div>
            </div>
            {user?.avatar_url && (
              <div className="relative justify-self-center">
                <div className="absolute inset-0 rounded-full bg-[image:var(--gradient-hero)] blur-2xl opacity-50" />
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="relative size-48 rounded-full border-2 border-border object-cover md:size-56"
                />
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Public Repos" value={user?.public_repos ?? "—"} highlight />
            <StatCard label="Followers" value={user?.followers ?? "—"} />
            <StatCard label="Following" value={user?.following ?? "—"} />
            <StatCard label="Years on GitHub" value={yearsCoding} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <SectionTitle eyebrow="About" title="Backend-leaning, product-minded" />
        <div className="mt-10 grid gap-6 text-muted-foreground md:grid-cols-2">
          <p className="text-lg leading-relaxed">
            I'm a full stack developer focused on PHP and the Laravel ecosystem. I enjoy designing clean APIs, applying the repository pattern, and shipping features that solve real business problems.
          </p>
          <p className="text-lg leading-relaxed">
            From e-commerce carts to blog platforms and real-estate apps, I've built end-to-end systems across the stack — database modeling, server-side logic, and the interfaces that bring them to life.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionTitle eyebrow="Skills" title="The tools I reach for" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SkillCard icon={Server} title="Backend" items={["PHP", "Laravel", "REST APIs", "OOP"]} />
            <SkillCard icon={Code2} title="Frontend" items={["JavaScript", "HTML / CSS", "Blade", "Tailwind"]} />
            <SkillCard icon={Database} title="Database" items={["MySQL", "Eloquent ORM", "Migrations", "Query Builder"]} />
            <SkillCard icon={Wrench} title="Tools" items={["Git", "Composer", "Repository Pattern", "MVC"]} />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Projects"
            title={`${user?.public_repos ?? visibleRepos.length} repositories on GitHub`}
          />
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-muted-foreground hover:text-primary md:inline-flex items-center gap-1"
          >
            View all <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {!repos &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl border border-border bg-card/50" />
            ))}
          {visibleRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Github className="size-4 text-muted-foreground" />
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{repo.name}</h3>
                </div>
                <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">
                {repo.description ?? "No description provided."}
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" />
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1"><Star className="size-3.5" /> {repo.stargazers_count}</span>
                <span className="inline-flex items-center gap-1"><GitFork className="size-3.5" /> {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <SectionTitle eyebrow="Contact" title="Let's build something" center />
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Have a project in mind, a role to fill, or just want to chat about Laravel? Reach out — I'd love to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold hover:border-primary transition-colors"
            >
              <Github className="size-4" /> github.com/{GITHUB_USER}
            </a>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-hero)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition-opacity"
            >
              <Mail className="size-4" /> Email me
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ahmed Elbaz. Built with TanStack Start.
      </footer>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border bg-card/60 p-5 ${highlight ? "border-primary/50 shadow-[var(--shadow-glow)]" : "border-border"}`}>
      <div className={`text-3xl font-bold ${highlight ? "bg-[image:var(--gradient-hero)] bg-clip-text text-transparent" : ""}`}>{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function SkillCard({ icon: Icon, title, items }: { icon: typeof Code2; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary">
      <Icon className="size-6 text-primary" />
      <h3 className="mt-4 font-semibold">{title}</h3>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
