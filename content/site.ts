export type PortraitId = keyof typeof portraits;

export const portraits = {
  brighton: { src: '/images/portraits/tommy-in-brighton.jpg', alt: 'Chenghao Tommy Jiang in Brighton', label: 'Brighton, UK', code: 'BRIGHTON_UK', urbanPosition: '50% 38%' },
  panama: { src: '/images/portraits/tommy-in-panama.jpg', alt: 'Chenghao Tommy Jiang in Panama', label: 'Panama', code: 'PANAMA', urbanPosition: '50% 38%' },
  portrait03: { src: '/images/portraits/tommy-in-madison.jpg', alt: 'Chenghao Tommy Jiang portrait', label: 'Madison, WI', code: 'MADISON_WI', urbanPosition: '50% 50%' },
};

export const portraitOrder: PortraitId[] = ['brighton', 'panama', 'portrait03'];

type FeaturedProject = {
  no: string;
  meta: string;
  title: string;
  description: string;
  href: string;
  action: string;
  kind: 'research' | 'game';
  image?: string;
  imageAlt?: string;
  coverLines?: string[];
  coverKicker?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    no: '01',
    meta: 'Tera AI · Research / Public context',
    title: 'Tera AI Research',
    description: 'Researching geometry-guided correspondence, visual localization, and diagnostic workflows for long-horizon flight video.',
    href: 'https://www.tera-ai.com/blog/delivering-autonomy-in-days-instead-of-months-via-software',
    action: 'Read the public context',
    kind: 'research',
    coverLines: ['REAL', 'WORLD', 'RESEARCH.'],
    coverKicker: 'VISION / GEOMETRY / MOTION',
  },
  {
    no: '02',
    meta: 'Independent · Game / In development',
    title: 'Time Block Hero',
    description: 'A science-fiction strategy game where time is both the battlefield and the most valuable resource.',
    href: 'https://time-block-hero.github.io/tbh-website/index-en.html',
    action: 'Visit project site',
    kind: 'game',
    image: '/images/projects/time-block-hero.jpg',
    imageAlt: 'Time Block Hero world artwork',
  },
];

export const organizations = [
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

export const lifePhotos = [
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

export const ukPhotos = [
  { title: 'Tommy in Brighton', place: 'Brighton, UK', src: '/images/albums/manchester/tommy-in-brighton-pier.jpg', note: 'Sea wind, an impossible amount of blue sky, and one bright pause during the Manchester years.', orientation: 'portrait' },
  { title: 'Tommy in UoM', place: 'University of Manchester', src: '/images/albums/manchester/tommy-in-uom.jpg', note: 'A playful frame at Alliance Manchester Business School—one small marker of a formative year.', orientation: 'portrait' },
  { title: 'Watching Man City', place: 'Etihad Stadium, Manchester', src: '/images/albums/manchester/watching-mancity.jpg', note: 'Rain outside, floodlights inside, and a first match at the Etihad.', orientation: 'landscape' },
];

export const photoStories = [
  { id: 'manchester', eyebrow: 'UK / 2023', title: 'Life in Manchester', summary: 'Grey skies, long walks, robotics, football, and the first feeling that the world could become much larger.', color: 'violet', photos: ukPhotos },
  { id: 'madison', eyebrow: 'WISCONSIN / FRIENDS', title: 'Life in Madison', summary: 'Research happened in the lab. The rest of the education happened around dinner tables, road trips, and conversations after class.', color: 'red', photos: [lifePhotos[0], lifePhotos[4], lifePhotos[5]] },
  { id: 'travelling', eyebrow: 'AWAY / IN BETWEEN', title: 'Travelling', summary: 'New places interrupt routine. They also return me to the work with a slightly different sense of scale.', color: 'blue', photos: [lifePhotos[1], lifePhotos[2], lifePhotos[3]] },
  { id: 'california', eyebrow: 'WEST COAST / NOW', title: 'Life in California', summary: 'Los Angeles is the current base: building spatial intelligence by day and playable science fiction after hours.', color: 'orange', photos: [lifePhotos[8], lifePhotos[7], lifePhotos[6]] },
];

export const photoCount = photoStories.reduce((total, story) => total + story.photos.length, 0);

export type AlbumSet = (typeof photoStories)[number];

export type ContactIconName = 'location' | 'email' | 'github' | 'linkedin' | 'orcid' | 'cv';

export const contactLinks: Array<{ icon: ContactIconName; label: string; value: string; href: string; external?: boolean }> = [
  { icon: 'location', label: 'Based in', value: 'Los Angeles, CA', href: 'https://www.google.com/maps/search/?api=1&query=Los+Angeles%2C+CA', external: true },
  { icon: 'email', label: 'Email', value: 'tommyjiangch@gmail.com', href: 'mailto:tommyjiangch@gmail.com' },
  { icon: 'github', label: 'GitHub', value: '@JesusmiCaH', href: 'https://github.com/JesusmiCaH', external: true },
  { icon: 'linkedin', label: 'LinkedIn', value: 'Chenghao Jiang', href: 'https://www.linkedin.com/in/chenghao-jiang-93a979228', external: true },
  { icon: 'orcid', label: 'ORCID', value: '0009-0009-3555-1869', href: 'https://orcid.org/0009-0009-3555-1869', external: true },
  { icon: 'cv', label: 'Curriculum vitae', value: 'Resume / PDF', href: '/resume-chenghao-jiang.pdf', external: true },
];

export const publications: Array<{ id: string; month: string; year: string; category: string; title: string; authors: string; status: string; abstractLabel: string; abstract: string; preview: boolean; href?: string; linkLabel?: string; image?: string; imageAlt?: string }> = [
  {
    "month": "MAY",
    "year": "2026",
    "category": "PLACEHOLDER / DESIGN PREVIEW",
    "title": "Geometry-Guided Correspondence for Long-Horizon Visual Localization",
    "authors": "Chenghao Jiang, sample collaborators",
    "status": "DESIGN PREVIEW",
    "abstractLabel": "SAMPLE ABSTRACT",
    "abstract": "This placeholder explores a correspondence frontend designed for long-horizon aerial video, with an emphasis on geometric supervision, practical latency, and diagnosing how matching behavior propagates into trajectory error.",
    "id": "correspondence",
    "preview": true
  },
  {
    "month": "FEB",
    "year": "2026",
    "category": "PLACEHOLDER / DESIGN PREVIEW",
    "title": "Disentangling Illumination and Content for Controllable Scene Generation",
    "authors": "Sample collaborators, Chenghao Jiang",
    "status": "DESIGN PREVIEW",
    "abstractLabel": "SAMPLE ABSTRACT",
    "abstract": "This placeholder studies representations that separate scene content from illumination, then recombine both factors in a controllable generative pipeline for relighting and scene synthesis.",
    "id": "illumination",
    "preview": true
  },
  {
    "month": "DEC",
    "year": "2025",
    "category": "NETWORKED PERCEPTION · COMPUTER VISION · ROBOTICS",
    "title": "Privacy-Aware Sharing of Raw Spatial Sensor Data for Cooperative Perception",
    "authors": "Bangya Liu, Chengpo Yan, Chenghao Jiang, Suman Banerjee, Akarsh Prabhakara",
    "status": "ARXIV PREPRINT",
    "href": "https://arxiv.org/abs/2512.16265",
    "linkLabel": "ARXIV",
    "abstractLabel": "ABSTRACT / CONDENSED",
    "abstract": "Cooperative perception can strengthen vehicle scene understanding, but sharing raw spatial sensor data introduces privacy risks that may slow adoption. This paper presents SHARP, a research framework for reducing privacy leakage while preserving the value of raw-data collaboration, and frames open questions spanning networked systems, mobile computing, perception, industry, and policy.",
    "id": "sharp",
    "preview": false,
    "image": "/images/papers/sharp/figure-1.png",
    "imageAlt": "SHARP overview of raw sensor-data sharing and privacy leakage"
  }
];

export const site = {
  templateName: 'Urbanview',
  title: 'Chenghao “Tommy” Jiang — 3D Vision & Game Design',
  description: 'The personal portfolio of Chenghao “Tommy” Jiang, a 3D vision researcher and game designer working across spatial intelligence, visual localization, and playable worlds.',
  language: 'en',
  brand: 'TOM—ME',
  name: { first: 'CHENGHAO', nickname: '“TOMMY”', last: 'JIANG', chinese: '蒋承浩' },
  locationLine: 'NEW IN LOS ANGELES / 2026',
  roles: ['3D VISION', 'GAME DESIGN', 'WORLD BUILDING'],
  sticker: ['RESEARCHER', '× DESIGNER'],
  sloganLabel: 'Personal direction / 未来想做的事',
  slogan: ['UNDERSTAND', 'REAL WORLDS.', 'BUILD NEW ONES.'],
  bio: [
    'I am a 3D vision researcher interested in how machines recover geometry, motion, and place from images. At Tera AI, I work on dense correspondence, visual localization, reconstruction, and the diagnostic tools connecting model behavior to real flight trajectories.',
    'My path began with optoelectronics, moved through signal processing in Manchester, and expanded into cooperative perception, generative vision, and Gaussian Splatting across UW–Madison, Johns Hopkins, and HKUST(GZ). Outside the lab, I design and develop Time Block Hero—a science-fiction strategy game about bending time.',
  ],
  focus: 'GEOMETRY / MOTION / LIGHT / TIME',
  timelineRange: '2018 → NOW',
  workSubtitle: 'Research & playable worlds',
  contactHref: 'mailto:tommyjiangch@gmail.com?subject=Let%27s%20make%20the%20next%20frame',
};
