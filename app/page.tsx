'use client';

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';

type PortraitId = 'brighton' | 'panama' | 'portrait03';

const portraits: Record<PortraitId, { src: string; alt: string; label: string; fieldbookPosition: string }> = {
  brighton: { src: '/images/portraits/tommy-in-brighton.jpg', alt: 'Chenghao Tommy Jiang in Brighton', label: 'Brighton, UK', fieldbookPosition: '50% 38%' },
  panama: { src: '/images/portraits/tommy-in-panama.jpg', alt: 'Chenghao Tommy Jiang in Panama', label: 'Panama', fieldbookPosition: '50% 38%' },
  portrait03: { src: '/images/portraits/tommy-in-madison.jpg', alt: 'Chenghao Tommy Jiang portrait', label: 'Madison, WI', fieldbookPosition: '50% 50%' },
};

const portraitOrder: PortraitId[] = ['brighton', 'panama', 'portrait03'];

const mascotStickers = [
  { id: 'welcome', src: '/images/mascot/stickers/welcome.png' },
  { id: 'thinking', src: '/images/mascot/stickers/thinking.png' },
  { id: 'celebrate', src: '/images/mascot/stickers/celebrate.png' },
  { id: 'gaming', src: '/images/mascot/stickers/gaming.png' },
  { id: 'surprised', src: '/images/mascot/stickers/surprised.png' },
] as const;

const featuredProjects = [
  {
    no: '01',
    meta: 'Tera AI · Research / Public context',
    title: 'Tera AI Research',
    description: 'Researching geometry-guided correspondence, visual localization, and diagnostic workflows for long-horizon flight video.',
    href: 'https://www.tera-ai.com/blog/delivering-autonomy-in-days-instead-of-months-via-software',
    action: 'Read the public context',
    kind: 'research',
  },
  {
    no: '02',
    meta: 'Independent · Game / In development',
    title: 'Time Block Hero',
    description: 'A science-fiction strategy game where time is both the battlefield and the most valuable resource.',
    href: 'https://time-block-hero.github.io/tbh-website/index-en.html',
    action: 'Visit project site',
    kind: 'game',
  },
];

const organizations = [
  {
    id: 'tera', name: 'Tera AI', dates: 'Aug 2025 — Present', timelineFromMonth: 'Aug', timelineFromYear: '2025', timelineToMonth: 'Now', timelineToYear: '2026', relation: 'Aug 2025 — Present · 3D vision', role: '3D Vision Researcher · previously Research Intern', href: 'https://www.tera-ai.com/', logo: '/images/orgs/tera.svg', dark: true,
    summary: 'Building practical perception systems for long-horizon, GPS-denied visual localization.',
    details: [
      'Built geometry-guided pseudo-label and evaluation pipelines for dense image correspondence.',
      'Fine-tuned and evaluated correspondence frontends under latency and robustness constraints.',
      'Connected correspondence behavior to GPS-referenced trajectory error through flight-replay diagnostics.',
    ],
  },
  {
    id: 'jhu', name: 'Johns Hopkins University', dates: 'Sep 2025 — Feb 2026', timelineFromMonth: 'Sep', timelineFromYear: '2025', timelineToMonth: 'Feb', timelineToYear: '2026', relation: 'Sep 2025 — Feb 2026 · Research', role: 'Research Assistant', href: 'https://www.jhu.edu/', logo: '/images/orgs/jhu.png', dark: true,
    summary: 'Explored how generative models can separate and recombine scene content and illumination.',
    details: [
      'Designed a ViT image encoder to disentangle intrinsic scene content from extrinsic illumination.',
      'Developed a DiT-based formulation using lighting as a prompt and scene content as control.',
      'Conducted remotely under the supervision of Prof. Anand Bhattad.',
    ],
  },
  {
    id: 'uw', name: 'UW–Madison', dates: 'Sep 2024 — Dec 2025', timelineFromMonth: 'Sep', timelineFromYear: '2024', timelineToMonth: 'Dec', timelineToYear: '2025', relation: 'Sep 2024 — Dec 2025 · Education', role: 'M.S. in Electrical & Computer Engineering', href: 'https://www.wisc.edu/', logo: '/images/orgs/uw-madison.png', dark: false,
    summary: 'Deepened my work in computer vision, robotics, and cooperative perception.',
    details: [
      'Graduated with a 3.82/4.0 GPA.',
      'Studied privacy-aware cooperative SLAM using SHARP, VGGT, OPV2V, and CARLA.',
      'Contributed to work on sharing spatial sensor data without exposing raw imagery.',
    ],
  },
  {
    id: 'hkust', name: 'HKUST(GZ)', dates: 'Nov 2023 — Jun 2024', timelineFromMonth: 'Nov', timelineFromYear: '2023', timelineToMonth: 'Jun', timelineToYear: '2024', relation: 'Nov 2023 — Jun 2024 · Research', role: 'Research Assistant', href: 'https://www.hkust-gz.edu.cn/', logo: '/images/orgs/hkust-gz.png', dark: true,
    summary: 'Worked on animatable human Gaussian Splatting across viewpoints and body poses.',
    details: [
      'Developed a canonical avatar representation with SMPL-driven deformation.',
      'Co-designed a correspondence-guided consistency loss using RoMA matches and DINO features.',
      'Conducted remotely under the supervision of Prof. Haoang Li.',
    ],
  },
  {
    id: 'manchester', name: 'University of Manchester', dates: 'Sep 2022 — Dec 2023', timelineFromMonth: 'Sep', timelineFromYear: '2022', timelineToMonth: 'Dec', timelineToYear: '2023', relation: 'Sep 2022 — Dec 2023 · Education', role: 'M.S. in Communication & Signal Processing', href: 'https://www.manchester.ac.uk/', logo: '/images/orgs/manchester.png', dark: false,
    summary: 'Moved from signal processing toward robotics, machine perception, and visual intelligence.',
    details: [
      'Graduated with Distinction, earning an 83.5/100 overall result.',
      'Built the mathematical and signal-processing foundation behind my later vision research.',
    ],
  },
  {
    id: 'cust', name: 'Changchun University of Science and Technology', dates: 'Sep 2018 — Jun 2022', timelineFromMonth: 'Sep', timelineFromYear: '2018', timelineToMonth: 'Jun', timelineToYear: '2022', relation: 'Sep 2018 — Jun 2022 · Education', role: 'B.Eng. in Optoelectronic Information Science', href: 'https://www.cust.edu.cn/', logo: '/images/orgs/cust.png', dark: false,
    summary: 'Began with optics, imaging, and engineering—the physical foundations of how machines see.',
    details: [
      'Graduated in the top 10 of 221 students.',
      'Built a foundation spanning optoelectronics, imaging systems, and computational methods.',
    ],
  },
];

const lifePhotos = [
  { title: 'Thanksgiving Party', place: 'Madison, WI', src: '/images/albums/madison/thanksgiving-party.jpg', note: 'A crowded table, improvised dishes, and the kind of night that turns colleagues into friends.', orientation: 'landscape' },
  { title: 'Tommy in NYC', place: 'New York, NY', src: '/images/albums/travelling/tommy-in-nyc.jpg', note: 'A cold skyline, a borrowed rooftop, and more energy than one frame could hold.', orientation: 'landscape' },
  { title: 'Arriving in Panama', place: 'Tocumen Airport, Panama', src: '/images/albums/travelling/tommy-in-panama.jpg', note: 'A bright arrival frame—the trip begins before leaving the airport.', orientation: 'landscape' },
  { title: 'North Michigan', place: 'Copper Harbor, MI', src: '/images/albums/travelling/travel-in-north-michigan.jpg', note: 'At the edge of Lake Superior, with good friends and extremely serious sunglasses.', orientation: 'landscape' },
  { title: 'With Kangwook', place: 'Madison, WI', src: '/images/albums/madison/tommy-with-kangwook.jpg', note: 'A quick photo after one of many conversations that made the work clearer.', orientation: 'landscape' },
  { title: 'New Year Party', place: 'Madison, WI', src: '/images/albums/madison/new-year-party.jpg', note: 'One more year begun around a table—with too much food and exactly enough people.', orientation: 'landscape' },
  { title: 'Tera Team', place: 'San Diego, CA', src: '/images/albums/california/tommy-at-tera.jpg', note: 'A San Diego evening with the Tera team, somewhere between building systems and building trust.', orientation: 'landscape' },
  { title: 'Tommy in LA', place: 'Los Angeles, CA', src: '/images/albums/california/tommy-in-la.jpg', note: 'A new apartment, a new coast, and the beginning of the next chapter.', orientation: 'portrait' },
  { title: 'Watching YOASOBI', place: 'Los Angeles, CA', src: '/images/albums/california/watching-yoasobi.jpg', note: 'An open-air summer night—music, old friends, and the city briefly singing in Japanese.', orientation: 'landscape' },
];

const ukPhotos = [
  { title: 'Tommy in Brighton', place: 'Brighton, UK', src: '/images/albums/manchester/tommy-in-brighton-pier.jpg', note: 'Sea wind, an impossible amount of blue sky, and one bright pause during the Manchester years.', orientation: 'portrait' },
  { title: 'Tommy in UoM', place: 'University of Manchester', src: '/images/albums/manchester/tommy-in-uom.jpg', note: 'A playful frame at Alliance Manchester Business School—one small marker of a formative year.', orientation: 'portrait' },
  { title: 'Watching Man City', place: 'Etihad Stadium, Manchester', src: '/images/albums/manchester/watching-mancity.jpg', note: 'Rain outside, floodlights inside, and a first match at the Etihad.', orientation: 'landscape' },
];

const photoStories = [
  { id: 'manchester', eyebrow: 'UK / 2023', title: 'Life in Manchester', summary: 'Grey skies, long walks, robotics, football, and the first feeling that the world could become much larger.', photos: ukPhotos },
  { id: 'madison', eyebrow: 'WISCONSIN / FRIENDS', title: 'Life in Madison', summary: 'Research happened in the lab. The rest of the education happened around dinner tables, road trips, and conversations after class.', photos: [lifePhotos[0], lifePhotos[4], lifePhotos[5]] },
  { id: 'travelling', eyebrow: 'AWAY / IN BETWEEN', title: 'Travelling', summary: 'New places interrupt routine. They also return me to the work with a slightly different sense of scale.', photos: [lifePhotos[1], lifePhotos[2], lifePhotos[3]] },
  { id: 'california', eyebrow: 'WEST COAST / NOW', title: 'Life in California', summary: 'Los Angeles is the current base: building spatial intelligence by day and playable science fiction after hours.', photos: [lifePhotos[8], lifePhotos[7], lifePhotos[6]] },
];

const photoCount = photoStories.reduce((total, story) => total + story.photos.length, 0);
type AlbumSet = (typeof photoStories)[number];

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? '↓' : '↗'}</span>;
}

type ContactIconName = 'location' | 'email' | 'github' | 'linkedin' | 'orcid' | 'cv';

function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === 'location') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === 'email') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === 'github') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z" /></svg>;
  if (name === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1" /><path d="M8 11v6M12 17v-6m0 2.5c.8-1.6 4-2 4 1V17" /></svg>;
  if (name === 'orcid') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.3 10.3v6M8.3 7.5v.1M11.5 10.3h2.2a3 3 0 0 1 0 6h-2.2v-6Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></svg>;
}

const contactLinks: Array<{ icon: ContactIconName; label: string; value: string; href: string; external?: boolean }> = [
  { icon: 'location', label: 'Based in', value: 'Los Angeles, CA', href: 'https://www.google.com/maps/search/?api=1&query=Los+Angeles%2C+CA', external: true },
  { icon: 'email', label: 'Email', value: 'tommyjiangch@gmail.com', href: 'mailto:tommyjiangch@gmail.com' },
  { icon: 'github', label: 'GitHub', value: '@JesusmiCaH', href: 'https://github.com/JesusmiCaH', external: true },
  { icon: 'linkedin', label: 'LinkedIn', value: 'Chenghao Jiang', href: 'https://www.linkedin.com/in/chenghao-jiang-93a979228', external: true },
  { icon: 'orcid', label: 'ORCID', value: '0009-0009-3555-1869', href: 'https://orcid.org/0009-0009-3555-1869', external: true },
  { icon: 'cv', label: 'Curriculum vitae', value: 'Resume / PDF', href: '/resume-chenghao-jiang.pdf', external: true },
];

function FieldbookContact() {
  return (
    <address className="fieldbook-contact">
      <header><span>Contact / Find me</span><p>Research, games, or a good conversation—say hello.</p></header>
      <div>
        {contactLinks.map((link) => (
          <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} key={link.label}>
            <i><ContactIcon name={link.icon} /></i>
            <span><small>{link.label}</small><strong>{link.value}</strong></span>
            <Arrow />
          </a>
        ))}
      </div>
    </address>
  );
}

function FieldbookTimeline() {
  return (
    <ol className="fieldbook-timeline">
      {organizations.map((organization, index) => (
        <li key={organization.id}>
          <time>
            <span className="timeline-to">
              <small>To</small>
              <span><strong>{organization.timelineToMonth}</strong><em>{organization.timelineToYear}</em></span>
            </span>
            <span className="timeline-from">
              <small>From</small>
              <span><strong>{organization.timelineFromMonth}</strong><em>{organization.timelineFromYear}</em></span>
            </span>
          </time>
          <span className="timeline-spine" aria-hidden="true"><i /></span>
          <details className="timeline-entry">
            <summary>
              <span className="timeline-entry-shell">
                <span className="timeline-entry-lead">
                  <span className={`organization-mark ${organization.dark ? 'is-dark' : 'is-light'}`}>
                    <img src={organization.logo} alt="" />
                  </span>
                  <span>
                    <small>{String(index + 1).padStart(2, '0')} / {organization.role}</small>
                    <strong>{organization.name}</strong>
                    <span className="timeline-entry-summary">{organization.summary}</span>
                  </span>
                  <i aria-hidden="true">＋</i>
                </span>
                <span className="timeline-entry-details">
                  <small>Notes from this chapter</small>
                  <span className="timeline-entry-points">{organization.details.map((detail) => <span key={detail}>{detail}</span>)}</span>
                  <a href={organization.href} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>Visit institution <Arrow /></a>
                </span>
              </span>
            </summary>
          </details>
        </li>
      ))}
    </ol>
  );
}

function FieldbookProjects() {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false, suppressUntil: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scrollProjects = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * Math.min(520, window.innerWidth * .72), behavior: 'smooth' });
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if ((event.target as Element).closest?.('a, button')) return;
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft, moved: false, suppressUntil: 0 };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 5) dragRef.current.moved = true;
    rail.scrollLeft = dragRef.current.startScroll - distance;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;
    dragRef.current.active = false;
    if (dragRef.current.moved) dragRef.current.suppressUntil = Date.now() + 300;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  const protectLinksAfterDrag = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (Date.now() < dragRef.current.suppressUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="fieldbook-project-window">
      <div className="fieldbook-project-controls">
        <div><button type="button" onClick={() => scrollProjects(-1)} aria-label="Previous projects">←</button><button type="button" onClick={() => scrollProjects(1)} aria-label="Next projects">→</button></div>
      </div>
      <div
        className={`fieldbook-project-grid ${isDragging ? 'is-dragging' : ''}`}
        ref={railRef}
        role="region"
        aria-label="Selected projects carousel"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={protectLinksAfterDrag}
        onDragStart={(event) => event.preventDefault()}
      >
        {featuredProjects.map((project) => (
          <article className={`fieldbook-project-card is-${project.kind}`} key={project.no}>
            <span className="fieldbook-project-frame">
              <span className="note-top"><span>{project.no}</span><span>{project.kind}</span></span>
              {project.kind === 'game' ? <img src="/images/projects/time-block-hero.jpg" alt="Time Block Hero science-fiction world" draggable="false" /> : <span className="fieldbook-research-visual" aria-hidden="true"><i /><i /><i /><b>LOCALIZE</b></span>}
            </span>
            <span className="fieldbook-project-copy">
              <small>{project.meta}</small>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
              <a href={project.href} target="_blank" rel="noreferrer"><span>{project.action}</span><Arrow /></a>
            </span>
          </article>
        ))}
        <article className="fieldbook-project-coming">
          <span className="fieldbook-project-frame is-empty">
            <span className="note-top"><span>03+</span><span>Open frame</span></span>
            <span className="coming-mark" aria-hidden="true">✦</span>
          </span>
          <span className="fieldbook-project-copy">
            <small>The collection is still growing</small>
            <strong>More coming soon.</strong>
            <p>Future research, playable systems, and experiments will join this gallery when they have a public record.</p>
          </span>
        </article>
      </div>
    </div>
  );
}

function FieldbookAlbumViewer({ album, onClose }: { album: AlbumSet; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="fieldbook-album-viewer" role="dialog" aria-modal="true" aria-label={`${album.title} album`} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="fieldbook-album-sheet">
        <header>
          <span>Tom-me / fieldbook archive</span>
          <strong>{album.title}</strong>
          <button type="button" onClick={onClose} aria-label="Close album">Close ×</button>
        </header>
        <div className="fieldbook-album-pages">
          <article className="fieldbook-album-note">
            <span className="note-tape" aria-hidden="true" />
            <small>{album.eyebrow}</small>
            <h2>{album.title}</h2>
            <p>{album.summary}</p>
            <i>— Tommy</i>
          </article>
          {album.photos.map((photo) => (
            <figure className={`is-${photo.orientation}`} key={photo.src}>
              <span className="photo-pin" aria-hidden="true">📌</span>
              <img src={photo.src} alt={photo.title} />
              <figcaption>
                <span><strong>{photo.title}</strong><small>{photo.place}</small></span>
                <p>{photo.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Fieldbook({ portraitId, onCyclePortrait, lifeExpanded, onToggleLife }: { portraitId: PortraitId; onCyclePortrait: () => void; lifeExpanded: boolean; onToggleLife: () => void }) {
  const portrait = portraits[portraitId];
  const portraitNumber = portraitOrder.indexOf(portraitId) + 1;
  const [activeMascotIndex, setActiveMascotIndex] = useState(0);
  const activeMascot = mascotStickers[activeMascotIndex];
  const cycleMascot = () => setActiveMascotIndex((index) => (index + 1) % mascotStickers.length);
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const openAlbum = photoStories.find((album) => album.id === openAlbumId);
  return (
    <main className="fieldbook-page">
      <nav className="fieldbook-nav">
        <a className="fieldbook-sign" href="#fieldbook-home">Tom-me <i>✦</i></a>
        <div><a href="#fieldbook-places">Timeline</a><a href="#fieldbook-work">Projects</a><a href="#fieldbook-papers">Papers</a><a href="#fieldbook-life">Life</a></div>
        <a className="nav-email" href="mailto:tommyjiangch@gmail.com">Say hello <Arrow /></a>
      </nav>

      <section className="fieldbook-hero is-hero-editorial" id="fieldbook-home">
        <div className="fieldbook-portrait">
          <div className="tape" aria-hidden="true" />
          <button className="portrait-cycle" type="button" onClick={onCyclePortrait} aria-label={`Show next portrait. Current portrait: ${portrait.label}`}>
            <img src={portrait.src} alt={portrait.alt} style={{ objectPosition: portrait.fieldbookPosition }} />
          </button>
          <span className="photo-caption">Tommy in {portrait.label} · P{portraitNumber}/3</span>
          <button
            className="portrait-mascot-cycle"
            type="button"
            onClick={cycleMascot}
            aria-label={`Show next character sticker. Current sticker: ${activeMascot.id}`}
            title="Change character sticker"
          >
            <img src={activeMascot.src} alt="" key={activeMascot.id} />
          </button>
        </div>

        <div className="fieldbook-intro">
          <p className="fieldbook-role">3D vision researcher / game designer</p>
          <div className="fieldbook-name">
            <h1><em>Tommy</em><span> Jiang</span></h1>
            <p className="fieldbook-legal-name"><span>Chenghao Jiang</span><span lang="zh-CN">蒋承浩</span></p>
          </div>
          <p className="fieldbook-slogan">I reconstruct real worlds—and build new ones to <i>play in.</i></p>
          <div className="fieldbook-bio">
            <p>
              I am a 3D vision researcher interested in how machines recover geometry, motion,
              and place from images. At <b>Tera AI</b>, I work on dense correspondence,
              visual localization, reconstruction, and the diagnostic tools that connect model
              behavior to real flight trajectories.
            </p>
            <p>
              My path into spatial intelligence began with optoelectronics, continued through
              signal processing in Manchester, and expanded into cooperative perception,
              generative vision, and Gaussian Splatting across UW–Madison, Johns Hopkins, and
              HKUST(GZ). Outside the lab, I design and develop <b>Time Block Hero</b>—a
              science-fiction strategy game about bending time.
            </p>
          </div>
          <FieldbookContact />
        </div>
      </section>

      <section className="fieldbook-places" id="fieldbook-places">
        <header className="fieldbook-section-header">
          <div><small>01 / Timeline</small><h2>My path, so far</h2></div>
        </header>
        <div className="fieldbook-timeline-heading"><span>2018</span><strong>Work, research & education</strong><span>Now</span></div>
        <FieldbookTimeline />
      </section>

      <section className="fieldbook-notes" id="fieldbook-work">
        <header className="fieldbook-section-header">
          <div><small>02 / Projects</small><h2>Selected projects</h2></div>
        </header>
        <FieldbookProjects />
      </section>

      <section className="fieldbook-papers" id="fieldbook-papers">
        <header className="fieldbook-section-header">
          <div><small>03 / Publications</small><h2>Publications</h2></div>
        </header>
        <div className="fieldbook-paper-list">
          <article className="fieldbook-paper-coming">
            <time>Next</time>
            <span className="paper-timeline-mark" aria-hidden="true"><i /></span>
            <div><small>WORK IN PROGRESS</small><strong>More coming soon.</strong></div>
          </article>
          <details className="fieldbook-paper">
            <summary>
              <time><strong>Dec</strong><span>2025</span></time>
              <span className="paper-timeline-mark" aria-hidden="true"><i /></span>
              <span className="fieldbook-paper-shell">
                <span className="fieldbook-paper-lead">
                  <span className="paper-record">
                    <span className="paper-figure"><img src="/images/papers/sharp/figure-1.png" alt="SHARP overview of raw sensor-data sharing and privacy leakage" /></span>
                    <span className="paper-record-copy">
                      <small>NETWORKED PERCEPTION · COMPUTER VISION · ROBOTICS</small>
                      <strong>Privacy-Aware Sharing of Raw Spatial Sensor Data for Cooperative Perception</strong>
                      <span>Bangya Liu, Chengpo Yan, <b>Chenghao Jiang</b>, Suman Banerjee, Akarsh Prabhakara</span>
                    </span>
                  </span>
                  <span className="paper-actions"><small>ARXIV PREPRINT</small><span className="paper-action-links"><a href="https://arxiv.org/abs/2512.16265" target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>ARXIV <Arrow /></a></span></span>
                </span>
                <span className="paper-abstract"><small>ABSTRACT / CONDENSED</small><span>Cooperative perception can strengthen vehicle scene understanding, but sharing raw spatial sensor data introduces privacy risks that may slow adoption. This paper presents SHARP, a research framework for reducing privacy leakage while preserving the value of raw-data collaboration, and frames open questions spanning networked systems, mobile computing, perception, industry, and policy.</span></span>
              </span>
            </summary>
          </details>
        </div>
      </section>

      <section className={`fieldbook-life ${lifeExpanded ? 'is-expanded' : 'is-collapsed'}`} id="fieldbook-life">
        <header className="fieldbook-section-header">
          <div><small>04 / Life</small><h2>Life, around the work</h2></div>
          <p>People, places, and the bits between milestones.</p>
        </header>
        <button className="fieldbook-life-toggle" type="button" onClick={onToggleLife} aria-expanded={lifeExpanded} aria-controls="fieldbook-album">
          <span>{lifeExpanded ? 'Stack the album' : 'Open the album'}</span>
          <small>{photoCount} photographs / 4 chapters</small>
          <i aria-hidden="true">{lifeExpanded ? '↑' : '↓'}</i>
        </button>
        {lifeExpanded ? (
          <div className="fieldbook-album-index" id="fieldbook-album">
            {photoStories.map((album, index) => (
              <button className="fieldbook-album-card" type="button" onClick={() => setOpenAlbumId(album.id)} key={album.id}>
                <span className="fieldbook-album-cover">
                  <img src={album.photos[0].src} alt="" loading="lazy" />
                  <strong>{album.title}</strong>
                  <small>VOL. {String(index + 1).padStart(2, '0')}</small>
                </span>
                <span className="fieldbook-album-card-copy"><small>{album.eyebrow} / {album.photos.length} photographs</small><strong>{album.summary}</strong><i>Open volume ↗</i></span>
              </button>
            ))}
            <button className="fieldbook-life-toggle is-bottom" type="button" onClick={onToggleLife}><span>Stack the album</span><small>Return to the short version</small><i aria-hidden="true">↑</i></button>
          </div>
        ) : (
          <div className="fieldbook-collapsed-stack" id="fieldbook-album">
            {photoStories.map((album, index) => (
              <button type="button" onClick={() => setOpenAlbumId(album.id)} aria-label={`Open ${album.title}`} key={album.id}>
                <img src={album.photos[0].src} alt="" loading="lazy" />
                <span className="fieldbook-stack-title"><small>ALBUM {String(index + 1).padStart(2, '0')}</small><strong>{album.title}</strong><i>{album.photos.length} frames</i></span>
              </button>
            ))}
          </div>
        )}
        <a className="fieldbook-open-memory" href="mailto:tommyjiangch@gmail.com?subject=Let%27s%20make%20the%20next%20frame">
          <span className="photo-pin" aria-hidden="true">📌</span>
          <span className="fieldbook-open-copy">
            <small>AN OPEN PAGE / FOR THE NEXT MEMORY</small>
            <h3>Want to be in<br />the next frame?</h3>
            <p>I&apos;m always happy to meet curious people, trade ideas, or make something together.</p>
            <strong>Leave a note ↗</strong>
          </span>
          <span className="fieldbook-empty-frame" aria-hidden="true"><i>your photo<br />could go here</i></span>
        </a>
      </section>
      {openAlbum && <FieldbookAlbumViewer album={openAlbum} onClose={() => setOpenAlbumId(null)} />}
    </main>
  );
}

export default function Home() {
  const [activePortrait, setActivePortrait] = useState<PortraitId>('brighton');
  const [lifeExpanded, setLifeExpanded] = useState(false);
  const cyclePortrait = () => {
    const currentIndex = portraitOrder.indexOf(activePortrait);
    setActivePortrait(portraitOrder[(currentIndex + 1) % portraitOrder.length]);
  };

  return (
    <div className="design-canvas">
      <Fieldbook
        portraitId={activePortrait}
        onCyclePortrait={cyclePortrait}
        lifeExpanded={lifeExpanded}
        onToggleLife={() => setLifeExpanded((expanded) => !expanded)}
      />
    </div>
  );
}
