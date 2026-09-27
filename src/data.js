// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Ayush Sharma',
  role: 'Backend Engineer',
  tagline: 'I build backends that stay up when traffic doesn’t calm down.',
  location: 'Bengaluru, India',
  photo: '/ayush.webp',
  email: 'thisisayush79@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayush-sharma-551133213/',
  medium: 'https://medium.com/@thisisayush79',
  github: 'https://github.com/This-is-Ayush-Sharma',
  whoami: {
    name: 'Ayush Sharma',
    role: 'Software Engineer @ Jupiter Money',
    previously: ['Zscaler', 'XS Worldwide'],
    stack: ['Java', 'Kotlin', 'TypeScript', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'AWS'],
    focus: 'microservices, event-driven systems, reliability',
    open_to_work: true,
  },
}

export const metrics = [
  { value: 30, suffix: '%', label: 'infra cost cut moving cron jobs EC2 → EKS' },
  { value: 251, suffix: '×', label: 'faster query with PostgreSQL partitioning' },
  { value: 75, suffix: '%', label: 'fewer API failures (12% → 3%) at Zscaler' },
  { value: 3000, suffix: '+', label: 'university students on a backend I shipped' },
  { value: 300, suffix: '+', label: 'LeetCode problems solved' },
  { value: 3992, suffix: '', label: 'engineers following along on LinkedIn' },
]

export const experience = [
  {
    company: 'Jupiter Money',
    role: 'Software Engineer',
    when: 'May 2025 — Present',
    where: 'Bengaluru · On-site',
    points: [
      'Architected an independent consumer-facing microservice (TypeScript, Express.js) enabling direct API integration for 5+ enterprise clients — 15% incremental revenue.',
      'Built API-key auth and Redis rate limiting; client onboarding time cut by 50% and manual support tickets eliminated.',
      'Refactored data-aggregation REST APIs with better indexing and query batching — 25% lower inter-service latency.',
      'Owned the migration of cron jobs from EC2 to EKS end-to-end — 30% lower infra cost, with Prometheus + Alertmanager monitoring.',
    ],
    tags: ['TypeScript', 'Express.js', 'Spring Boot', 'Kotlin', 'Redis', 'EKS', 'Prometheus'],
  },
  {
    company: 'Zscaler',
    role: 'SDE Intern · DevOps',
    when: 'Feb 2024 — Aug 2024',
    where: 'Bengaluru · On-site',
    points: [
      'Built a Spring Boot REST API for automated PDF reports — 30% less manual reporting, self-service for 200+ internal users.',
      'Designed a resilient Spring WebClient with exponential backoff — API failure rate down from 12% to 3% under heavy traffic.',
      'Pushed code coverage to 76% with JUnit & Mockito, preventing 15+ production bugs; fixed DB connection leaks cutting downtime from 45 to 8 min.',
      'Configured RBAC admin dashboards — 35% better internal tooling efficiency.',
    ],
    tags: ['Java', 'Spring Boot', 'WebClient', 'JUnit', 'Docker', 'Kubernetes'],
  },
  {
    company: 'XS Worldwide',
    role: 'SDE Intern',
    when: 'Apr 2023 — Jun 2023',
    where: 'Noida · Remote',
    points: [
      'Engineered a Node.js / Express / MongoDB backend for interactive exhibitions — 40% more engagement, 25% faster loads.',
      'Deployed on AWS EC2 behind Nginx at 99.9% uptime with 30% more concurrent capacity.',
      'Wired up NodeMCU + RFID IoT exhibits that raised visitor interactions by 50%.',
    ],
    tags: ['Node.js', 'MongoDB', 'AWS EC2', 'Nginx', 'IoT'],
  },
]

export const education = [
  {
    school: 'GIET University, Gunupur',
    degree: 'B.Tech, Computer Science',
    when: '2020 — 2024',
    detail: 'CGPA 8.23',
    notes: ['Led the backend for the official GIETU app (3,000+ students)', 'Built the real-time bus tracking system — patent was granted', 'Security audit of the university ERP — letter of commendation'],
  },
  {
    school: 'St. Paul’s School, Rourkela',
    degree: 'Intermediate & Matriculation, Science',
    when: '2004 — 2020',
  },
]

// image: file in public/certs (optional). highlight: shown as a badge.
export const certifications = [
  { title: 'The Joy of Computing using Python', issuer: 'NPTEL · IIT Madras', date: 'Oct 2022', image: '/certs/nptel.webp', highlight: 'Elite · Top 2% · 91%', link: 'https://archive.nptel.ac.in/content/noc/NOC22/SEM2/Ecertificates/106/noc22-cs122/Course/NPTEL22CS122S6310003910032052.jpg' },
  { title: 'Software Engineer', issuer: 'HackerRank', date: 'Jun 2024', image: '/certs/hr-swe.webp', link: 'https://www.hackerrank.com/certificates/aed79c1938c0' },
  { title: 'Java (Basic)', issuer: 'HackerRank', date: 'Jun 2024', image: '/certs/hr-java.webp', link: 'https://www.hackerrank.com/certificates/751724671b82' },
  { title: 'SQL (Basic)', issuer: 'HackerRank', date: 'Jun 2024', image: '/certs/hr-sql.webp', link: 'https://www.hackerrank.com/certificates/eebabc0f8991' },
  { title: 'TalentNext — Java Full Stack', issuer: 'Wipro', date: 'Oct 2023', link: 'https://cert.diceid.com/csr/cid/TpHPIk' },
  { title: 'HTML, CSS, JavaScript, React', issuer: 'Udemy', date: 'Apr 2023', image: '/certs/udemy.webp', link: 'https://www.udemy.com/certificate/UC-0f4c1345-dea6-4b1e-aa51-89078f6ae8a2/' },
  { title: 'React & Redux Certification', issuer: 'Complete Coding', date: 'Dec 2024', link: 'https://learn.completecoding.in/verify-certificate' },
  { title: 'JavaScript Certification', issuer: 'Complete Coding', date: 'Dec 2024', link: 'https://learn.completecoding.in/verify-certificate' },
]

export const projects = [
  {
    title: 'Real-time Bus GPS Tracking',
    blurb: 'Live location for every university bus, built into the official GIETU app. Led the backend for a team of three; the IoT tracking system was granted a patent. Featured on the GIET University website.',
    stack: ['Node.js', 'Socket.io', 'Express', 'Azure VM', 'IoT'],
    badge: 'Patent granted',
    link: 'https://lnkd.in/gn3Hbm2u',
  },
  {
    title: 'GIETU Official App — Backend',
    blurb: 'Production backend for the university’s official mobile app serving 3,000+ students. Data modelling, APIs and deployment on Azure.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Azure'],
    badge: '3,000+ users',
  },
  {
    title: 'ERP Security Audit (VAPT)',
    blurb: 'Two-person vulnerability assessment of the university ERP. Found flaws that exposed and allowed edits to student records & attendance. Reported, fixed, and received a letter of commendation.',
    stack: ['Pentesting', 'Web security', 'Responsible disclosure'],
    badge: 'Commended',
  },
]

const gh = name => `https://github.com/This-is-Ayush-Sharma/${name}`
export const repos = [
  { name: 'Go Concurrency Lab', desc: 'Production-style job queue with a pooled worker set, fine-grained rate limiting and real-time metrics.', lang: 'Go', link: gh('Concurrent-Job-Queue-System-Worker-Pool-Rate-Limiter-') },
  { name: 'API Uptime Monitor', desc: 'Polls APIs on a schedule and tracks availability. Dockerised, cmd/internal layout.', lang: 'Go', link: gh('API-Uptime-Monitor') },
  { name: 'Multi-Region Checkout', desc: 'Abstract Factory per region — Razorpay/PayU for India, RakutenPay/LinePay for Japan, region-specific invoices.', lang: 'Java', link: gh('Multi-Region-Checkout-Service') },
  { name: 'webclientRetry', desc: 'Spring WebClient with exponential backoff — the pattern that cut API failures from 12% to 3% at Zscaler.', lang: 'Java', link: gh('webclientRetry') },
  { name: 'URL Shortener', desc: 'Express service with a caching layer, middleware and MVC structure.', lang: 'Node.js', link: gh('url-shortner') },
  { name: 'Online CompileX', desc: 'Browser-based code compiler with live output streamed over WebSockets.', lang: 'JavaScript', link: gh('Online-CompileX-') },
]

export const writing = [
  {
    title: 'Taming the Beast: A Practical Guide to PostgreSQL Table Partitioning',
    hook: 'Your table hit 1 billion rows. A 47,832 ms query drops to 187 ms — with zero application changes.',
    where: 'Medium',
    stat: '2.1k+ impressions',
    link: 'https://medium.com/@thisisayush79/taming-the-beast-a-practical-guide-to-postgresql-table-partitioning-6270eda45e30',
  },
  {
    title: 'Inside Cron: The Engineering Behind the Scheduler Everyone Takes for Granted',
    hook: 'Cron wakes up once a minute and that’s it. Why jobs silently never fire — from the engineer who moved Jupiter’s cron jobs to EKS.',
    where: 'Medium',
    stat: 'Nov 2025',
    link: 'https://medium.com/@thisisayush79/inside-cron-the-engineering-behind-the-scheduler-everyone-takes-for-granted-426b3ab536e5',
  },
  {
    title: 'Retry Mechanisms: A Critical Vector for System Instability',
    hook: 'Distributed systems don’t die from one failed request. They die from thousands of well-intentioned retries.',
    where: 'LinkedIn',
    stat: '1.3k+ impressions',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7415840647032541186/',
  },
  {
    title: '6 months as an SDE Intern at Zscaler',
    hook: 'Spring Boot, production incidents, and the mentors who made it count.',
    where: 'LinkedIn',
    stat: '590 reactions · Featured',
    // ponytail: post URL not found; profile shows it at the top under Featured
    link: 'https://www.linkedin.com/in/ayush-sharma-551133213/',
  },
  {
    title: 'Closing the B.Tech chapter',
    hook: 'Building a bus GPS tracker with friends that ended up on the university website — and what college taught me beyond the classroom.',
    where: 'LinkedIn',
    stat: '6.4k+ impressions',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7408209281914724352/',
  },
]

export const skills = {
  Languages: ['Java', 'Kotlin', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
  Backend: ['Spring Boot', 'Express.js', 'Node.js', 'REST', 'WebSockets', 'Microservices'],
  'Data & Messaging': ['Kafka', 'Redis', 'PostgreSQL', 'MongoDB'],
  'Cloud & Ops': ['AWS', 'EKS', 'Kubernetes', 'Docker', 'Prometheus', 'Nginx', 'Azure'],
  Quality: ['JUnit', 'Mockito', 'Circuit breakers', 'Backoff + jitter', 'Observability'],
}

// GitHub stats: fetched live from api.github.com; this snapshot (Sep 2026) shows if the API is down/rate-limited.
export const githubUser = 'This-is-Ayush-Sharma'
export const githubSnapshot = {
  repos: 77, followers: 37, stars: 17, since: 2021,
  langs: [['JavaScript', 24], ['EJS', 7], ['Kotlin', 6], ['HTML', 6], ['Java', 4]],
}
