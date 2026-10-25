import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X, ArrowDown, ExternalLink, Play } from 'lucide-react'
import { p } from './data/portfolio'

const NAV = ['home', 'about', 'projects', 'achievements', 'skills', 'contact']
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const r = useReducedMotion()
  return (
    <motion.div className={className} initial={r ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>{children}</motion.div>
  )
}

function Magnetic({ children }: { children: ReactNode }) {
  const r = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  return (
    <motion.div className="inline-block" style={{ x, y }}
      onMouseMove={e => { if (r) return; const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * 0.15); y.set((e.clientY - b.top - b.height / 2) * 0.15) }}
      onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
  )
}

const btn = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet'
const primary = `${btn} bg-gradient-to-r from-violet to-indigo text-white hover:brightness-110`
const ghost = `${btn} border border-white/15 text-zinc-200 hover:bg-white/5`

function useActive() {
  const [a, setA] = useState('home')
  useEffect(() => {
    const o = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setA(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(id => { const el = document.getElementById(id); if (el) o.observe(el) })
    return () => o.disconnect()
  }, [])
  return a
}

function Nav() {
  const active = useActive()
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-lg font-bold text-white">KS<span className="text-violet">.</span></a>
        <ul className="hidden gap-7 md:flex">
          {NAV.map(id => <li key={id}><a href={`#${id}`} className={`text-sm transition ${active === id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}>{cap(id)}</a></li>)}
        </ul>
        <button className="md:hidden text-white" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <ul className="border-t border-white/5 bg-ink px-6 py-3 md:hidden">
        {NAV.map(id => <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className={`block py-2 ${active === id ? 'text-white' : 'text-zinc-400'}`}>{cap(id)}</a></li>)}
      </ul>}
    </header>
  )
}

const Socials = () => (
  <div className="flex gap-3">
    {[[Github, p.links.github, 'GitHub'], [Linkedin, p.links.linkedin, 'LinkedIn'], [Mail, p.links.email, 'Email']].map(([I, h, l]: any) => (
      <a key={l} href={h} aria-label={l} target={l === 'Email' ? undefined : '_blank'} rel="noreferrer"
        className="rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:border-violet hover:text-white"><I size={18} /></a>
    ))}
  </div>
)

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="orb absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-violet/20 blur-3xl" aria-hidden />
      <div className="orb absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-indigo/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="mb-5 text-xs font-medium tracking-[0.2em] text-sky">{p.label}</p>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">{p.heading}</h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-400">{p.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic><a href="#projects" className={primary}>Explore My Work</a></Magnetic>
            <Magnetic><a href="#contact" className={ghost}>Let's Connect</a></Magnetic>
            <Socials />
          </div>
        </Reveal>
      </div>
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500"><ArrowDown className="animate-bounce" /></a>
    </section>
  )
}

const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} className="mx-auto max-w-6xl px-6 py-28">
    <Reveal><h2 className="mb-12 font-display text-3xl font-bold text-white md:text-5xl">{title}</h2></Reveal>
    {children}
  </section>
)

function ProjectCard({ pr }: { pr: (typeof p.projects)[number] }) {
  return (
    <Reveal>
      <motion.article whileHover={{ y: -6 }} className={`overflow-hidden rounded-2xl border border-white/10 bg-panel/60 ${pr.featured ? 'md:grid md:grid-cols-2' : ''}`}>
        <div className="group relative aspect-video overflow-hidden rounded-t-2xl bg-ink md:h-full md:rounded-l-2xl md:rounded-tr-none">
          <img src={pr.image} alt={pr.imageAlt} width={1600} height={900} loading="lazy" decoding="async"
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 group-hover:brightness-110" />
          {pr.concept && <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-zinc-300 backdrop-blur">Concept illustration</span>}
        </div>
        <div className="p-7">
          <h3 className="font-display text-2xl font-bold text-white">{pr.title}</h3>
          <p className="mt-3 text-zinc-400">{pr.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">{pr.tech.map(t => <li key={t} className="rounded-full bg-indigo/15 px-3 py-1 text-xs text-sky">{t}</li>)}</ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {pr.github ? <a href={pr.github} target="_blank" rel="noopener noreferrer" className={ghost}><Github size={16} />GitHub</a>
              : <span aria-disabled className={`${ghost} cursor-not-allowed opacity-40`}><Github size={16} />Repo soon</span>}
            {pr.demo ? <a href={pr.demo} target="_blank" rel="noopener noreferrer" className={primary}><ExternalLink size={16} />Live Demo</a>
              : <span aria-disabled className={`${ghost} cursor-not-allowed opacity-40`}><ExternalLink size={16} />Live Demo</span>}
            {pr.video && <a href={pr.video} target="_blank" rel="noopener noreferrer" className={ghost}><Play size={16} />Watch Demo</a>}
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

function Skills() {
  const cats = Object.keys(p.skills)
  const [c, setC] = useState(cats[0])
  return (
    <>
      <div role="tablist" className="mb-8 flex flex-wrap gap-2">
        {cats.map(k => <button key={k} role="tab" aria-selected={c === k} onClick={() => setC(k)}
          className={`rounded-full px-4 py-2 text-sm transition ${c === k ? 'bg-violet text-white' : 'border border-white/10 text-zinc-400 hover:text-white'}`}>{k}</button>)}
      </div>
      <motion.ul key={c} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {p.skills[c].map(s => <li key={s.n} className="flex items-center justify-between rounded-xl border border-white/10 bg-panel/60 px-5 py-4">
          <span className="text-white">{s.n}</span><span className="text-xs text-sky">{s.s}</span></li>)}
      </motion.ul>
    </>
  )
}

export default function App() {
  const r = useReducedMotion()
  return (
    <motion.div initial={r ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Nav />
      <main>
        <Hero />
        <Section id="about" title="A little about me.">
          <div className="grid gap-8 md:grid-cols-2">{p.about.map(t => <Reveal key={t}><p className="text-lg leading-relaxed text-zinc-400">{t}</p></Reveal>)}</div>
          <Reveal className="mt-14 rounded-2xl border border-white/10 bg-panel/60 p-7">
            <p className="text-xs tracking-widest text-sky">EDUCATION</p>
            <h3 className="mt-2 font-display text-xl font-bold text-white">{p.education.degree}</h3>
            <p className="text-zinc-400">{p.education.school} · {p.education.years}</p>
          </Reveal>
        </Section>
        <Section id="projects" title="Selected projects."><div className="space-y-8">{p.projects.map(x => <ProjectCard key={x.title} pr={x} />)}</div></Section>
        <Section id="achievements" title="Achievements.">
          <ol className="relative ml-3 border-l border-indigo/30">
            {p.achievements.map(a => <li key={a.title} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-violet shadow-[0_0_14px_3px_rgba(139,92,246,.7)]" aria-hidden />
              <Reveal><h3 className="font-display text-lg font-bold text-white">{a.title}</h3>
                {a.date && <p className="text-sm text-sky">{a.date}</p>}<p className="text-zinc-400">{a.detail}</p></Reveal></li>)}
          </ol>
        </Section>
        <Section id="skills" title="Skills."><Skills /></Section>
        <Section id="contact" title="Let's build something meaningful.">
          <Reveal><p className="max-w-xl text-lg text-zinc-400">Whether it's a project, hackathon, collaboration, or simply exchanging ideas, I'd love to connect.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic><a href={p.links.linkedin} target="_blank" rel="noreferrer" className={primary}><Linkedin size={16} />LinkedIn</a></Magnetic>
              <Magnetic><a href={p.links.github} target="_blank" rel="noreferrer" className={ghost}><Github size={16} />GitHub</a></Magnetic>
              <Magnetic><a href={p.links.email} className={ghost}><Mail size={16} />Email</a></Magnetic>
            </div></Reveal>
        </Section>
      </main>
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} {p.name}</p><Socials />
        </div>
      </footer>
    </motion.div>
  )
}
