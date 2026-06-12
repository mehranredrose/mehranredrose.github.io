/* ═══════════════════════════════════════════════════════════
   MEHRANREDROSE.GITHUB.IO — MAIN JS  v2
   ═══════════════════════════════════════════════════════════ */

/* ── THEME ────────────────────────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon  = document.getElementById('toggle-icon');
const htmlEl      = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}
applyTheme(localStorage.getItem('theme') || 'dark');

themeToggle.addEventListener('click', () => {
  applyTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ── HAMBURGER ───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));

/* ── NAVIGATION ──────────────────────────────────────────── */
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
  sections.forEach(s => s.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  navItems.forEach(n => {
    if (n.getAttribute('data-section') === sectionId) n.classList.add('active');
  });
  history.replaceState(null, '', '#' + sectionId);
  navLinksEl.classList.remove('open');

  if (sectionId === 'projects'       && !projectsLoaded) loadProjects();
  if (sectionId === 'github-section' && !ghStatsLoaded)  loadGhStats();
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    showSection(item.getAttribute('data-section'));
  });
});

// brand click → home
document.getElementById('nav-brand-logo').addEventListener('click', () => showSection('home'));

const initHash = window.location.hash.replace('#', '') || 'home';
showSection(initHash);

/* ── TYPEWRITER ──────────────────────────────────────────── */
const typedEl = document.getElementById('typed-cmd');
const phrases = ['whoami','cat about.txt','ls projects/','git log --oneline','go run main.go','make ship-it'];
let pIdx = 0, cIdx = 0, deleting = false;

function type() {
  if (!typedEl) return;
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 95);
}
setTimeout(type, 600);

/* ── HOME BUTTONS ────────────────────────────────────────── */
const resumeOverlay = document.getElementById('resume-overlay');
document.getElementById('dl-resume').addEventListener('click', () => {
  resumeOverlay.classList.add('open');
});
document.getElementById('resume-close').addEventListener('click', () => {
  resumeOverlay.classList.remove('open');
});
resumeOverlay.addEventListener('click', e => {
  if (e.target === resumeOverlay) resumeOverlay.classList.remove('open');
});

document.getElementById('explore-projects').addEventListener('click', () => {
  showSection('projects');
});

document.getElementById('send-pixel-msg').addEventListener('click', () => {
  alert('📡 Pixel message transmitted!\n\nSend a real one to: mehranredrose@gmail.com');
});

/* ══════════════════════════════════════════════════════════
   DOCS
══════════════════════════════════════════════════════════ */
const docData = {
  python: {
    icon: '🐍', label: 'Python',
    entries: [
      { title: 'Environment Setup & Virtualenvs',   path: 'Docs/python/setup.html'        },
      { title: 'Async / Await Patterns',            path: null, sub: '/Docs/python/async'  },
      { title: 'Packaging & Publishing to PyPI',    path: null, sub: '/Docs/python/packaging'},
      { title: 'FastAPI Deep Dive',                 path: null, sub: '/Docs/python/fastapi'  },
    ]
  },
  js: {
    icon: '🟨', label: 'JavaScript',
    entries: [
      { title: 'Modern ES2023+ Features',           path: null, sub: '/Docs/js/modern'     },
      { title: 'Event Loop & Concurrency',          path: null, sub: '/Docs/js/event-loop' },
      { title: 'Node.js Streams',                   path: null, sub: '/Docs/js/streams'    },
      { title: 'Electron App Architecture',         path: null, sub: '/Docs/js/electron'   },
    ]
  },
  go: {
    icon: '🦫', label: 'Go',
    entries: [
      { title: 'Goroutines & Channels',             path: 'Docs/go/concurrency.html'       },
      { title: 'Building CLI Tools with Cobra',     path: null, sub: '/Docs/go/cli'        },
      { title: 'HTTP Clients & Retry Logic',        path: null, sub: '/Docs/go/http'       },
      { title: 'Cross-compiling macOS/Linux',       path: null, sub: '/Docs/go/cross'      },
    ]
  },
  linux: {
    icon: '🐧', label: 'Linux Tips',
    entries: [
      { title: 'Systemd Services Cheatsheet',       path: 'Docs/linux/systemd.html'        },
      { title: 'iptables & nftables Basics',        path: null, sub: '/Docs/linux/firewall'},
      { title: 'tmux Workflow',                     path: null, sub: '/Docs/linux/tmux'    },
      { title: 'Kernel Module Development 101',     path: null, sub: '/Docs/linux/modules' },
    ]
  },
  electron: {
    icon: '⚡', label: 'Electron',
    entries: [
      { title: 'Main vs Renderer Process',          path: null, sub: '/Docs/electron/processes'  },
      { title: 'IPC Patterns',                      path: null, sub: '/Docs/electron/ipc'        },
      { title: 'Auto-updater Setup',                path: null, sub: '/Docs/electron/autoupdate' },
      { title: 'Tray Icon & Menus',                 path: null, sub: '/Docs/electron/tray'       },
    ]
  },
  networking: {
    icon: '🌐', label: 'Networking',
    entries: [
      { title: 'WARP / WireGuard Protocol',         path: null, sub: '/Docs/networking/warp'   },
      { title: 'Split Tunneling Deep Dive',         path: null, sub: '/Docs/networking/split'  },
      { title: 'TUN/TAP Interfaces on Linux',       path: null, sub: '/Docs/networking/tuntap' },
      { title: 'pfctl on macOS',                    path: null, sub: '/Docs/networking/pfctl'  },
    ]
  },
};

function renderDocContent(cat) {
  const d = docData[cat];
  if (!d) return;
  const contentEl = document.getElementById('docs-content');
  const entriesHtml = d.entries.map(e => {
    const href = e.path || '#';
    const extra = e.path ? '' : `data-stub="${e.sub}"`;
    return `<li><a href="${href}" class="doc-link" ${extra}>${e.title}</a></li>`;
  }).join('');
  contentEl.innerHTML = `
    <div class="doc-entry">
      <div class="doc-title-bar">
        <span>${d.icon}</span>
        <span>${d.label}</span>
      </div>
      <ul class="doc-entries">${entriesHtml}</ul>
    </div>`;

  contentEl.querySelectorAll('.doc-link[data-stub]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      alert(`🗂  ${link.getAttribute('data-stub')}\n\nThis would load a Markdown doc in a real Hugo setup.\n(Static prototype — structure ready for generation!)`);
    });
  });
}

renderDocContent('python');

document.getElementById('doc-tree').querySelectorAll('.doc-cat').forEach(catEl => {
  catEl.addEventListener('click', () => {
    document.querySelectorAll('.doc-cat').forEach(c => c.classList.remove('active-cat'));
    catEl.classList.add('active-cat');
    renderDocContent(catEl.getAttribute('data-cat'));
  });
});

/* ══════════════════════════════════════════════════════════
   GITHUB API — STATS
══════════════════════════════════════════════════════════ */
let ghStatsLoaded = false;

async function loadGhStats() {
  ghStatsLoaded = true;
  try {
    const res  = await fetch('https://api.github.com/users/mehranredrose');
    const data = await res.json();
    document.getElementById('gh-repos').textContent     = data.public_repos ?? '--';
    document.getElementById('gh-followers').textContent = data.followers    ?? '--';
    document.getElementById('gh-following').textContent = data.following    ?? '--';
  } catch { /* keep -- */ }
}

/* ══════════════════════════════════════════════════════════
   GITHUB API — PROJECTS
══════════════════════════════════════════════════════════ */
let projectsLoaded = false;

const FALLBACK = [
  { name:'WARPture',          description:'Cloudflare WARP GUI with per-app split tunneling for macOS & Linux. Electron + React + Go tunnel agent.', language:'Go',         stargazers_count:0, html_url:'https://github.com/mehranredrose' },
  { name:'warp-split-tunnel', description:'Earlier WARPture iteration — monorepo with Electron, FastAPI tunnel agent & process monitor.',             language:'Python',     stargazers_count:0, html_url:'https://github.com/mehranredrose' },
  { name:'ZAP',               description:'Production-grade Django microservices social network backend designed for 10M+ DAU.',                      language:'Python',     stargazers_count:0, html_url:'https://github.com/mehranredrose' },
  { name:'swift-vpn-app',     description:'macOS VPN in Swift 5.9 + SwiftUI with Network Extensions and per-app split tunneling.',                   language:'Swift',      stargazers_count:0, html_url:'https://github.com/mehranredrose' },
  { name:'pixel-portfolio',   description:'This very portfolio — vanilla HTML/CSS/JS 8-bit retro. Zero build steps.',                                language:'HTML',       stargazers_count:0, html_url:'https://github.com/mehranredrose' },
  { name:'dotfiles',          description:'Personal dotfiles, shell scripts, and terminal config for macOS and Linux.',                               language:'Shell',      stargazers_count:0, html_url:'https://github.com/mehranredrose' },
];

const LANG_COLORS = {
  Go:'#00ADD8',Python:'#3572A5',JavaScript:'#F7DF1E',TypeScript:'#3178C6',
  Swift:'#F05138',Rust:'#DEA584',HTML:'#E34C26',CSS:'#563D7C',
  Shell:'#89E051',C:'#555555','C++':'#F34B7D',Java:'#B07219',
};

function renderProjects(repos) {
  const grid = document.getElementById('projects-grid');
  const statusEl = document.getElementById('projects-status');
  if (statusEl) statusEl.style.display = 'none';
  grid.innerHTML = '';

  repos.slice(0, 9).forEach(repo => {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href      = repo.html_url || '#';
    card.target    = '_blank';
    card.rel       = 'noopener noreferrer';

    const desc = repo.description
      ? (repo.description.length > 90 ? repo.description.slice(0,88)+'…' : repo.description)
      : 'No description.';

    const lc = LANG_COLORS[repo.language] || 'var(--fg-dim)';
    const langBadge = repo.language
      ? `<span class="project-lang" style="color:${lc}">● ${repo.language}</span>`
      : '<span class="project-lang">● —</span>';

    card.innerHTML = `
      <div class="project-name">${repo.name}</div>
      <div class="project-desc">${desc}</div>
      <div class="project-meta">
        ${langBadge}
        <span class="project-stars">★ ${repo.stargazers_count ?? 0}</span>
      </div>`;
    grid.appendChild(card);
  });
}

function showSkeletons() {
  document.getElementById('projects-grid').innerHTML =
    Array(6).fill('<div class="project-skeleton"></div>').join('');
}

async function loadProjects() {
  projectsLoaded = true;
  showSkeletons();
  const statusEl = document.getElementById('projects-status');
  if (statusEl) statusEl.style.display = 'none';
  try {
    const res = await fetch('https://api.github.com/users/mehranredrose/repos?per_page=30&sort=updated');
    if (!res.ok) throw new Error('API error');
    const repos = await res.json();
    const valid = repos.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count);
    renderProjects(valid.length ? valid : FALLBACK);
  } catch {
    renderProjects(FALLBACK);
    const s = document.getElementById('projects-status');
    if (s) { s.style.display='block'; s.textContent='⚠ GitHub API unavailable — showing demo projects.'; }
  }
}

if (window.location.hash === '#projects')       loadProjects();
if (window.location.hash === '#github-section') loadGhStats();
