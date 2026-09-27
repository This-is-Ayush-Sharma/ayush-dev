import { useEffect, useRef, useState } from 'react'
import { profile, metrics, experience, education, certifications, projects, repos, writing, skills, githubUser, githubSnapshot } from './data.js'

const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Fires once when the element scrolls into view (or keeps tracking if `live`).
function useInView(live = false) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (live) setInView(e.isIntersecting)
      else if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [live])
  return [ref, inView]
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, seen] = useInView()
  return <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}

function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="section">
      <Reveal as="header" className="section-head">
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}

function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="logo">&gt;_ ayush</a>
      <div className="nav-links">
        <a href="#lab">Lab</a>
        <a href="#work">Work</a>
        <a href="#education">Education</a>
        <a href="#certs">Certs</a>
        <a href="#projects">Projects</a>
        <a href="#writing">Writing</a>
        <a href="#contact" className="nav-cta">Hire me</a>
      </div>
    </nav>
  )
}

const json = JSON.stringify(profile.whoami, null, 2)
const cmd = 'curl -s api.ayush.dev/whoami | jq'

function Terminal() {
  const [typed, setTyped] = useState(reduced ? cmd.length : 0)
  const [lines, setLines] = useState(reduced ? 999 : 0)
  const out = json.split('\n')
  useEffect(() => {
    if (typed < cmd.length) { const t = setTimeout(() => setTyped(typed + 1), 38); return () => clearTimeout(t) }
    if (lines < out.length) { const t = setTimeout(() => setLines(lines + 1), lines === 0 ? 350 : 45); return () => clearTimeout(t) }
  }, [typed, lines, out.length])
  return (
    <div className="term" aria-label="Terminal showing profile JSON">
      <div className="term-bar"><i /><i /><i /><span>zsh — ayush@prod</span></div>
      <pre>
        <span className="prompt">$ </span>{cmd.slice(0, typed)}
        {typed < cmd.length && <span className="caret" />}
        {'\n'}
        {out.slice(0, lines).map((l, i) => <Json key={i} line={l} />)}
        {typed === cmd.length && lines >= out.length && <><span className="prompt">$ </span><span className="caret" /></>}
      </pre>
    </div>
  )
}

function Json({ line }) {
  const m = line.match(/^(\s*)"([^"]+)":\s?(.*)$/)
  if (!m) return <>{colorVal(line)}{'\n'}</>
  return <>{m[1]}<span className="j-key">"{m[2]}"</span>: {colorVal(m[3])}{'\n'}</>
}
function colorVal(v) {
  if (/^\s*"/.test(v)) return <span className="j-str">{v}</span>
  if (/true|false|\d/.test(v)) return <span className="j-num">{v}</span>
  return <span className="j-punc">{v}</span>
}

function Hero() {
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <header id="top" className="hero" onMouseMove={onMove}>
      <div className="hero-copy">
        <div className="id-row">
          <div className="avatar">
            <img src={profile.photo} alt={profile.name} width="88" height="88" fetchPriority="high" />
            <span className="online" title="Open to work" />
          </div>
          <p className="status"><span className="dot" /> Open to backend / full-stack roles</p>
        </div>
        <h1>{profile.name}<span className="accent">.</span></h1>
        <p className="lede">
          {profile.role} at <b>Jupiter Money</b>, ex-<b>Zscaler</b>. {profile.tagline}
        </p>
        <p className="sub">Java · Kotlin · TypeScript · Spring Boot · Kafka · Redis · PostgreSQL · AWS</p>
        <div className="cta-row">
          <a className="btn primary" href="#lab">Break my server →</a>
          <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href={profile.medium} target="_blank" rel="noreferrer">Medium</a>
        </div>
      </div>
      <Terminal />
    </header>
  )
}

function CountUp({ to, suffix }) {
  const [ref, seen] = useInView()
  const [n, setN] = useState(reduced ? to : 0)
  useEffect(() => {
    if (!seen || reduced) return
    let raf, start
    const step = t => {
      start ??= t
      const p = Math.min((t - start) / 1400, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{n.toLocaleString('en-IN')}{suffix}</span>
}

function Metrics() {
  return (
    <div className="metrics">
      {metrics.map((m, i) => (
        <Reveal key={m.label} className="metric" style={{ '--d': `${i * 70}ms` }}>
          <strong><CountUp to={m.value} suffix={m.suffix} /></strong>
          <span>{m.label}</span>
        </Reveal>
      ))}
    </div>
  )
}

/* ---------- Retry storm lab ----------
   ponytail: toy model — one server, fixed clients, 100ms ticks. Good enough to show the shape
   of a retry storm; not a queueing-theory simulation. */
const CLIENTS = 60, CAP = 12, WINDOW = 120

function newSim() {
  return {
    t: 0, outageUntil: 0, breakerUntil: 0,
    clients: Array.from({ length: CLIENTS }, () => ({ nextAt: Math.floor(Math.random() * 12), attempt: 0 })),
    hist: [], ok: 0, fail: 0, shed: 0, dropped: 0,
  }
}

function warmSim(smart) {
  const s = newSim()
  for (let i = 0; i < WINDOW; i++) tick(s, smart)
  s.ok = s.fail = s.shed = s.dropped = 0
  return s
}

function tick(s, smart) {
  s.t++
  const cap = s.t < s.outageUntil ? 2 : CAP
  const breakerOpen = smart && s.t < s.breakerUntil
  const due = s.clients.filter(c => c.nextAt <= s.t)
  let load = 0, ok = 0, fail = 0
  // Overloaded servers don't just cap out — they degrade (thread pools, GC, timeouts).
  const sending = breakerOpen ? [] : due
  load = sending.length
  const capacity = load > cap * 1.5 ? Math.floor(cap / 4) : cap
  sending.sort(() => Math.random() - 0.5)
  sending.forEach((c, i) => (i < capacity ? ok++ : fail++, c.ok = i < capacity))
  for (const c of due) {
    if (!breakerOpen && c.ok) { c.attempt = 0; c.nextAt = s.t + 8 + Math.floor(Math.random() * 6); continue }
    if (breakerOpen) s.shed++
    if (!smart) { c.nextAt = s.t + 1; c.attempt++; continue } // naive: retry immediately, forever
    c.attempt++
    if (c.attempt > 5) { s.dropped++; c.attempt = 0; c.nextAt = s.t + 10 + Math.floor(Math.random() * 6); continue }
    c.nextAt = s.t + 1 + Math.floor(Math.random() * Math.min(2 ** c.attempt, 32)) // exp backoff + full jitter
  }
  if (smart && !breakerOpen && load > 4 && fail / load > 0.5) s.breakerUntil = s.t + 12
  s.ok += ok; s.fail += fail
  s.hist.push({ load, cap, breaker: breakerOpen })
  if (s.hist.length > WINDOW) s.hist.shift()
}

function RetryLab() {
  const [ref, visible] = useInView(true)
  const sim = useRef(null)
  sim.current ??= warmSim(false)
  const [smart, setSmart] = useState(false)
  const [, force] = useState(0)
  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => { tick(sim.current, smart); force(x => x + 1) }, 100)
    return () => clearInterval(id)
  }, [visible, smart])

  const s = sim.current
  const max = Math.max(CAP * 3, ...s.hist.map(h => h.load))
  const W = 600, H = 180
  const x = i => (i / (WINDOW - 1)) * W
  const y = v => H - (v / max) * H
  const loadPts = s.hist.map((h, i) => `${x(i)},${y(h.load)}`).join(' ')
  const capPts = s.hist.map((h, i) => `${x(i)},${y(h.cap)}`).join(' ')
  const last = s.hist.at(-1) || { load: 0, cap: CAP }
  const total = s.ok + s.fail || 1
  const outage = s.t < s.outageUntil
  const hot = last.load > last.cap

  return (
    <Section id="lab" kicker="01 / interactive" title="Retry storms, live.">
      <Reveal className="lab" >
        <div ref={ref} className="lab-inner">
          <p className="lab-copy">
            I once wrote that <em>“distributed systems fail when thousands of well-intentioned retries overwhelm
            already saturated infrastructure.”</em> Don’t take my word for it — knock the downstream over and watch.
          </p>
          <div className="lab-controls">
            <div className="seg" role="group" aria-label="Retry strategy">
              <button className={!smart ? 'on bad' : ''} onClick={() => setSmart(false)}>Naive retry</button>
              <button className={smart ? 'on good' : ''} onClick={() => setSmart(true)}>Backoff + jitter + breaker</button>
            </div>
            <button className="btn danger" onClick={() => (s.outageUntil = s.t + 30)} disabled={outage}>
              {outage ? 'Downstream is down…' : '💥 Kill downstream (3s)'}
            </button>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className={`chart ${hot ? 'hot' : ''}`} preserveAspectRatio="none" role="img"
            aria-label={`Server load ${last.load} requests per tick versus capacity ${last.cap}`}>
            {s.hist.map((h, i) => h.breaker && <rect key={i} x={x(i)} y="0" width={W / WINDOW + 1} height={H} className="breaker" />)}
            <polyline points={capPts} className="cap" />
            <polyline points={loadPts} className="load" />
          </svg>
          <p className={`lab-hint ${!outage && hot && !smart ? 'show' : ''}`}>
            Downstream recovered 👀 — but the retries are keeping it down. That’s a metastable failure. Flip the strategy.
          </p>
          <div className="legend"><span className="l-load">requests / tick</span><span className="l-cap">server capacity</span>{smart && <span className="l-brk">circuit open</span>}</div>
          <div className="lab-stats">
            <div><b className={hot ? 'bad' : ''}>{last.load}</b><span>load now</span></div>
            <div><b>{Math.round((s.ok / total) * 100)}%</b><span>success rate</span></div>
            <div><b>{s.fail.toLocaleString()}</b><span>failed calls hitting server</span></div>
            <div><b>{smart ? s.shed.toLocaleString() : '—'}</b><span>shed by breaker</span></div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function Work() {
  return (
    <Section id="work" kicker="02 / experience" title="Where I’ve shipped.">
      <ol className="timeline">
        {experience.map(e => (
          <Reveal as="li" key={e.company} className="job">
            <div className="job-meta">
              <span className="when">{e.when}</span>
              <span className="where">{e.where}</span>
            </div>
            <div className="job-body">
              <h3>{e.role} <span className="at">@ {e.company}</span></h3>
              <ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul>
              <div className="tags">{e.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" kicker="03 / education" title="Where it started.">
      <div className="edu">
        {education.map((e, i) => (
          <Reveal key={e.school} className={`edu-card ${i === 0 ? 'main' : ''}`} style={{ '--d': `${i * 90}ms` }}>
            <div className="edu-top">
              <span className="when">{e.when}</span>
              {e.detail && <span className="badge">{e.detail}</span>}
            </div>
            <h3>{e.school}</h3>
            <p className="degree">{e.degree}</p>
            {e.notes && <ul>{e.notes.map(n => <li key={n}>{n}</li>)}</ul>}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Certifications() {
  const dlg = useRef(null)
  const [open, setOpen] = useState(null)
  const show = c => { setOpen(c); dlg.current.showModal() }
  return (
    <Section id="certs" kicker="04 / certifications" title="Receipts.">
      <div className="certs">
        {certifications.map((c, i) => (
          <Reveal key={c.title} className="cert" style={{ '--d': `${(i % 4) * 70}ms` }}>
            {c.image
              ? <button className="cert-img" onClick={() => show(c)} aria-label={`View ${c.title} certificate`}>
                  <img src={c.image} alt="" loading="lazy" decoding="async" />
                </button>
              : <div className="cert-img blank"><span>{c.issuer}</span></div>}
            <div className="cert-body">
              {c.highlight && <span className="badge">{c.highlight}</span>}
              <h3>{c.title}</h3>
              <p>{c.issuer} · {c.date}</p>
              <a href={c.link} target="_blank" rel="noreferrer">Verify ↗</a>
            </div>
          </Reveal>
        ))}
      </div>
      <dialog ref={dlg} className="lightbox" onClick={e => e.target === dlg.current && dlg.current.close()}>
        {open && <>
          <img src={open.image} alt={`${open.title} certificate — ${open.issuer}`} />
          <div className="lb-bar">
            <span>{open.title} · {open.issuer}</span>
            <button className="btn" onClick={() => dlg.current.close()}>Close</button>
          </div>
        </>}
      </dialog>
    </Section>
  )
}

function useGitHub() {
  const [gh, setGh] = useState(githubSnapshot)
  useEffect(() => {
    const api = `https://api.github.com/users/${githubUser}`
    Promise.all([fetch(api), fetch(`${api}/repos?per_page=100`)])
      .then(rs => Promise.all(rs.map(r => (r.ok ? r.json() : Promise.reject(r.status)))))
      .then(([u, list]) => {
        const own = list.filter(r => !r.fork)
        const counts = {}
        own.forEach(r => r.language && (counts[r.language] = (counts[r.language] || 0) + 1))
        setGh({
          repos: u.public_repos,
          followers: u.followers,
          stars: list.reduce((n, r) => n + r.stargazers_count, 0),
          since: new Date(u.created_at).getFullYear(),
          langs: Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5),
        })
      })
      .catch(() => {}) // keep snapshot
  }, [])
  return gh
}

function Heatmap() {
  const [data, setData] = useState(null)
  const box = useRef(null)
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setData)
      .catch(() => {}) // no heatmap if the API is down
  }, [])
  useEffect(() => { if (box.current) box.current.scrollLeft = box.current.scrollWidth }, [data]) // newest weeks visible on mobile
  if (!data) return null
  const days = data.contributions
  const pad = new Date(days[0].date).getUTCDay() // first column starts on Sunday
  return (
    <div className="heat">
      <p className="heat-total"><strong>{data.total.lastYear}</strong> contributions in the last year</p>
      <div className="heat-scroll" ref={box}>
        <div className="heat-grid" role="img" aria-label={`${data.total.lastYear} GitHub contributions in the last year`}>
          {Array.from({ length: pad }, (_, i) => <i key={`p${i}`} className="pad" />)}
          {days.map(d => <i key={d.date} className={`h${d.level}`} title={`${d.count} on ${d.date}`} />)}
        </div>
      </div>
    </div>
  )
}

function GitHubStats() {
  const gh = useGitHub()
  const total = gh.langs.reduce((n, [, c]) => n + c, 0)
  const stats = [[gh.repos, 'public repos'], [gh.stars, 'stars earned'], [gh.followers, 'followers'], [gh.since, 'shipping since']]
  return (
    <Reveal className="gh">
      <div className="gh-stats">
        {stats.map(([v, l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}
      </div>
      <div className="gh-bar" aria-hidden="true">
        {gh.langs.map(([l, c]) => <i key={l} className={`l-${l.replace(/\W/g, '').toLowerCase()}`} style={{ flexGrow: c }} />)}
      </div>
      <ul className="gh-langs">
        {gh.langs.map(([l, c]) => (
          <li key={l} className={`lang l-${l.replace(/\W/g, '').toLowerCase()}`}>{l} <em>{Math.round((c / total) * 100)}%</em></li>
        ))}
      </ul>
      <Heatmap />
    </Reveal>
  )
}

function Projects() {
  return (
    <Section id="projects" kicker="05 / projects" title="Built outside the day job.">
      <div className="cards">
        {projects.map((p, i) => {
          const Tag = p.link ? 'a' : 'div'
          return (
            <Reveal key={p.title} style={{ '--d': `${i * 90}ms` }}>
              <Tag className="card" {...(p.link && { href: p.link, target: '_blank', rel: 'noreferrer' })}>
                <span className="badge">{p.badge}</span>
                <h3>{p.title}{p.link && <span className="arrow"> ↗</span>}</h3>
                <p>{p.blurb}</p>
                <div className="tags">{p.stack.map(t => <span key={t}>{t}</span>)}</div>
              </Tag>
            </Reveal>
          )
        })}
      </div>
      <Reveal className="repos-head">
        <h3>More on GitHub</h3>
        <a href={profile.github} target="_blank" rel="noreferrer">@{githubUser} ↗</a>
      </Reveal>
      <GitHubStats />
      <div className="repos">
        {repos.map((r, i) => (
          <Reveal key={r.name} style={{ '--d': `${(i % 3) * 70}ms` }}>
            <a className="repo" href={r.link} target="_blank" rel="noreferrer">
              <h4>{r.name}</h4>
              <p>{r.desc}</p>
              <span className={`lang l-${r.lang.replace(/\W/g, '').toLowerCase()}`}>{r.lang}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Writing() {
  return (
    <Section id="writing" kicker="06 / writing" title="Things I’ve written.">
      <div className="posts">
        {writing.map(w => (
          <Reveal key={w.title}>
            <a className="post" href={w.link} target="_blank" rel="noreferrer">
              <div className="post-meta"><span>{w.where}</span><span>{w.stat}</span></div>
              <h3>{w.title}</h3>
              <p>{w.hook}</p>
              <span className="read">Read →</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" kicker="07 / toolbox" title="What I reach for.">
      <div className="skills">
        {Object.entries(skills).map(([group, list]) => (
          <Reveal key={group} className="skill-group">
            <h4>{group}</h4>
            <div className="tags big">{list.map(t => <span key={t}>{t}</span>)}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => navigator.clipboard?.writeText(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  return (
    <section id="contact" className="section contact">
      <Reveal>
        <img className="contact-photo" src={profile.photo} alt="" width="72" height="72" loading="lazy" />
        <span className="kicker">08 / contact</span>
        <h2 className="big-h">Have a system that needs to <span className="accent">scale</span>?</h2>
        <p className="lede">I’m open to backend and full-stack roles where systems design and scale matter. Remote, hybrid or on-site.</p>
        <div className="cta-row center">
          <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
          <button className="btn" onClick={copy}>{copied ? 'Copied ✓' : 'Copy email'}</button>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href={profile.medium} target="_blank" rel="noreferrer">Read on Medium</a>
        </div>
      </Reveal>
      <footer className="foot">© {new Date().getFullYear()} {profile.name} · No retries were harmed in the making of this site.</footer>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <RetryLab />
        <Work />
        <Education />
        <Certifications />
        <Projects />
        <Writing />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
