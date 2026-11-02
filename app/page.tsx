import { Suspense } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { ArrowUpRight } from 'lucide-react'

// Helper to strip accidental markdown link formatting like [url](url)
function sanitizeUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null
  const cleaned = rawUrl.trim()
  const markdownMatch = cleaned.match(/\((https?:\/\/[^\s)]+)\)/)
  if (markdownMatch) {
    return markdownMatch[1]
  }
  const bracketMatch = cleaned.match(/https?:\/\/[^\s\])]+/)
  if (bracketMatch) {
    return bracketMatch[0]
  }
  return cleaned
}

async function ProjectList() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-rose-400 text-sm">Failed to query database.</p>
  }

  if (!projects || projects.length === 0) {
    return <p className="text-slate-400 text-sm">No projects published yet.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => {
        const liveUrl = sanitizeUrl(project.live_url)
        const githubUrl = sanitizeUrl(project.github_url)
        const imageUrl = sanitizeUrl(project.image_url)

        return (
          <article
            key={project.id}
            className="group relative bg-[#181b26] border border-white/5 hover:border-orange-500/40 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-orange-500/5"
          >
            <div>
              {/* Project Snapshot / Thumbnail */}
              {imageUrl && (
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden border border-white/5 bg-[#12141c]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#ff6b3d]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="rounded-2xl bg-[#12141c] border border-white/5 p-4 text-xs text-slate-200">
                    <span className="text-[#ff6b3d] font-semibold block mb-1">
                      Key Results & Impact
                    </span>
                    {project.metrics}
                  </div>
                )}

                {project.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.split(',').map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-[#1f2330] text-slate-300 text-xs px-3 py-1 rounded-full border border-white/5"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-orange-400 transition"
                >
                  Live Dashboard <ArrowUpRight className="w-4 h-4 text-orange-500" />
                </a>
              ) : (
                <div />
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  Source Repository
                </a>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default function Home() {
  const services = [
    {
      code: '01',
      title: 'Cloud Data Warehousing & ETL',
      desc: 'Architecting centralized cloud data warehouses, relational star schemas, and automated extraction pipelines that eliminate reporting silos.',
      tools: ['Google BigQuery', 'PostgreSQL', 'SQL Server', 'Python ETL', 'Star Schema'],
    },
    {
      code: '02',
      title: 'Executive BI & Decision Dashboards',
      desc: 'Developing high-impact reporting suites and interactive dashboards that translate complex business data into clear, actionable executive levers.',
      tools: ['Power BI', 'DAX Formulas', 'Looker Studio', 'Cohort Analysis', 'Attribution'],
    },
    {
      code: '03',
      title: 'Financial & Quantitative Modeling',
      desc: 'Engineering empirical 3-statement models, DCF valuations, dynamic WACC matrices, and automated algorithmic backtesting scripts.',
      tools: ['DCF Valuation', 'WACC Matrices', 'Excel Models', 'Sensitivity Analysis', 'Quant Scripts'],
    },
  ]

  return (
    <main className="min-h-screen bg-[#12141c] text-white pt-24 pb-24 overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Hero Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-12 lg:py-24 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-2xl sm:text-3xl font-light text-slate-300">
              Hello,
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              I&apos;m Ebenezer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5429] to-[#ff7e47]">
                A Data & BI Specialist
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Transforming complex multi-source data into automated pipelines, 
              executive BI intelligence dashboards, and precision financial models.
            </p>

            {/* CTA + Social Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e54316] to-[#f95724] text-white font-semibold shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition"
              >
                <span>Discover Work</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>

              <div className="flex items-center gap-3 pl-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1f2b] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500/50 transition"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                <a
                  href="https://github.com/Ebenezeruzochukwu"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1f2b] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500/50 transition"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Hero Stage Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-orange-600/25 rounded-full blur-3xl -z-10" />
            <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border border-orange-500/20 -z-10" />

            <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-gradient-to-tr from-[#e54316] to-[#ff7a4b] p-1.5 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <div className="relative w-full h-full rounded-full bg-[#161822] overflow-hidden border-4 border-[#12141c]">
                <Image
                  src="/profile.png"
                  alt="Ebenezer Uzochukwu"
                  fill
                  sizes="(max-width: 768px) 288px, 336px"
                  className="object-cover object-center scale-105"
                  priority
                />
              </div>
            </div>

            {/* Floating Glass Pill 1: Left */}
            <div className="absolute -left-4 sm:-left-8 top-16 bg-[#1e2230]/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
              <span className="text-2xl font-bold text-white block">20+</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Pipelines Built</span>
            </div>

            {/* Floating Glass Pill 2: Top Right */}
            <div className="absolute -right-2 sm:-right-4 top-8 bg-[#1e2230]/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
              <span className="text-2xl font-bold text-white block">100%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Data Integrity</span>
            </div>

            {/* Floating Glass Pill 3: Bottom Right */}
            <div className="absolute right-2 sm:right-0 bottom-4 bg-[#1e2230]/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
              <div className="flex text-orange-400 text-xs mb-1">★★★★★</div>
              <span className="text-base font-bold text-white block">BI & Modeling</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Verified Solutions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-24 space-y-10">
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#ff6b3d] font-semibold block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Areas of Expertise
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Production-grade pipelines, business analytics infrastructure, and institutional modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.code}
              className="bg-[#181b26] border border-white/5 hover:border-orange-500/40 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-orange-500/5 group"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-orange-400/80 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
                  {item.code}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-white/5">
                {item.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono text-slate-400 bg-[#12141c] px-2.5 py-1 rounded-lg border border-white/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 pt-12 scroll-mt-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold block mb-2">
              Portfolio Ledger
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Selected Implementations
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Automated sync via Supabase
          </span>
        </div>

        <Suspense fallback={<p className="text-sm font-mono text-slate-500 animate-pulse">Syncing database entries...</p>}>
          <ProjectList />
        </Suspense>
      </section>

      {/* Footer Section */}
      <footer className="max-w-6xl mx-auto px-6 pt-20 mt-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <p>© 2026 Ebenezer Uzochukwu. All rights reserved.</p>
        <p className="text-slate-400">Next.js • Tailwind CSS • Supabase</p>
      </footer>
    </main>
  )
}