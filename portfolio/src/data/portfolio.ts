// Edit everything about the site here.
export const p = {
  name: 'Kamya Saini',
  label: 'MATHEMATICS & COMPUTING UNDERGRADUATE • IGDTUW',
  heading: 'Building ideas into intelligent solutions.',
  intro: "I'm Kamya Saini, a student developer exploring AI, software engineering, and creative problem-solving. I enjoy turning ideas into practical products and learning by building.",
  about: [
    "I'm a first-year B.Tech Mathematics & Computing student at IGDTUW in Delhi. I learn best by building real projects and testing ideas in hackathons.",
    "My interests span artificial intelligence, software engineering, web development, geospatial technology and problem solving. I want to build technology that is genuinely useful.",
  ],
  links: { github: 'https://github.com/kamyasaini', linkedin: 'https://www.linkedin.com/in/kamyasaini', email: 'mailto:kamyaasaini@gmail.com' },
  projects: [
    { title: 'CADASTRA — Automated Urban Parcel Intelligence', featured: true,
      description: 'An AI-powered 3D cadastral mapping and encroachment detection project that helps analyze urban parcels, building boundaries, roads, and potential encroachments using geospatial data.',
      tech: ['Next.js','React','FastAPI','Python','PostgreSQL','PostGIS','Rasterio','GeoPandas','Shapely','PyProj','CesiumJS','Resium'],
      image: '/cadastra-preview.png', imageAlt: 'Concept illustration of CADASTRA 3D cadastral parcel view with a highlighted potential encroachment', concept: true,
      github: 'https://github.com/kamyasaini/SIH26012_Project', demo: 'https://sih-26012-project.vercel.app/', video: 'https://www.youtube.com/watch?v=-MdPfCdn7RY' },
    { title: 'SafeWeb Guardian', featured: false,
      description: 'A Chrome Extension built with Manifest V3 that displays warning badges for potentially unsafe web content. 17 detector tests passed during local testing.',
      tech: ['Chrome Extension','Manifest V3'], image: '/safeweb-preview.png', imageAlt: 'Concept illustration of a browser security dashboard with a green shield and URL scan checks', concept: true,
      github: '', // add a real repository URL here; button stays disabled until then
      demo: '', video: '' },
  ],
  achievements: [
    { title: 'Campus Winner — Gemini Challenge', date: 'October 2026', detail: 'Won the campus round.' },
    { title: 'Smart India Hackathon', date: '', detail: 'Cleared the internal selection round with Team HackHers.' },
    { title: 'ThingQbator Innovation Mela', date: '', detail: 'Participated and presented ideas.' },
    { title: 'IIIT Delhi Hackathon', date: '', detail: 'Participated.' },
    { title: 'OpenAI DevDay Exchange — Delhi NCR', date: '', detail: 'Participated in the community event.' },
  ],
  // status: 'Used in Projects' | 'Learning' | 'Exploring'. Add only what you've really used.
  skills: {
    Programming: [{ n: 'Python', s: 'Used in Projects' }],
    Frontend: [{ n: 'React', s: 'Used in Projects' }, { n: 'Next.js', s: 'Used in Projects' }],
    Backend: [{ n: 'FastAPI', s: 'Used in Projects' }, { n: 'PostgreSQL', s: 'Used in Projects' }],
    'AI & Data': [{ n: 'AI / ML', s: 'Exploring' }],
    Geospatial: [{ n: 'PostGIS', s: 'Used in Projects' }, { n: 'GeoPandas', s: 'Used in Projects' }, { n: 'Shapely', s: 'Used in Projects' }, { n: 'Rasterio', s: 'Used in Projects' }, { n: 'PyProj', s: 'Used in Projects' }, { n: 'CesiumJS / Resium', s: 'Used in Projects' }],
    'Developer Tools': [{ n: 'Git & GitHub', s: 'Used in Projects' }, { n: 'Chrome Extensions (MV3)', s: 'Used in Projects' }],
  } as Record<string, { n: string; s: string }[]>,
  education: { degree: 'B.Tech Mathematics & Computing', school: 'Indira Gandhi Delhi Technical University for Women (IGDTUW)', years: '2026–2030' },
}
