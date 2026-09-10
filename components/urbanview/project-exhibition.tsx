'use client';

import { useEffect, useRef, useState } from 'react';
import { featuredProjects } from '@/content/site';
import { Arrow } from './arrow';

export function ProjectExhibition() {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => setPosition({ start: rail.scrollLeft < 4, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4 });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); rail.removeEventListener('scroll', update); };
  }, []);
  const move = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const width = rail.firstElementChild?.getBoundingClientRect().width ?? rail.clientWidth;
    rail.scrollBy({ left: direction * (width + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return (
    <div className="exhibition">
      <div className="exhibition-toolbar"><p>{String(featuredProjects.length).padStart(2, '0')} WORKS ON VIEW <span>/ RESEARCH + PLAY</span></p><div><button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous projects" aria-controls="project-gallery">←</button><button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next projects" aria-controls="project-gallery">→</button></div></div>
      <div className="exhibition-rail" id="project-gallery" ref={railRef} role="region" aria-label="Project exhibition; scroll horizontally to explore" tabIndex={0} onKeyDown={(event) => { if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
        {featuredProjects.map((project) => (
          <article className={`exhibition-poster is-${project.kind}`} key={project.no}>
            <div className="exhibition-ticket"><span>EXHIBIT / {project.no}</span><span>{project.kind === 'game' ? 'PLAYABLE WORLDS' : 'SPATIAL INTELLIGENCE'}</span></div>
            <a className="exhibition-cover" href={project.href} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title}`}>
              {project.image ? <img src={project.image} alt={project.imageAlt} loading="lazy" /> : <div className="exhibition-type-cover" aria-hidden="true"><span>{project.coverKicker ?? project.meta}</span><strong>{(project.coverLines ?? [project.title]).map((line, index, lines) => <span key={index}>{index === lines.length - 1 ? <i>{line}</i> : line}{index < lines.length - 1 && <br />}</span>)}</strong><span>{project.title} <span>↗</span></span></div>}
              <span className="exhibition-number" aria-hidden="true">{project.no}</span>
            </a>
            <div className="exhibition-caption"><p className="exhibition-meta">{project.meta}</p><h3>{project.title}</h3><p>{project.description}</p><a href={project.href} target="_blank" rel="noreferrer">{project.action} <Arrow /></a></div>
          </article>
        ))}
      </div>
      <p className="exhibition-footer"><span>THE EXHIBITION CONTINUES.</span><span>More work, as it takes shape. ↗</span></p>
    </div>
  );
}
