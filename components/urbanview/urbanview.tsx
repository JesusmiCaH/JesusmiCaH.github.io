'use client';

import { useState } from 'react';
import { site, portraits, portraitOrder, photoStories, photoCount, type PortraitId } from '@/content/site';
import { Arrow } from './arrow';
import { AlbumViewer } from './album-viewer';
import { Timeline } from './timeline';
import { Publications } from './publications';
import { ContactLinks } from './contact-links';
import { ProjectExhibition } from './project-exhibition';

export function Urbanview({ portraitId, onCyclePortrait, lifeExpanded, onToggleLife }: { portraitId: PortraitId; onCyclePortrait: () => void; lifeExpanded: boolean; onToggleLife: () => void }) {
  const portrait = portraits[portraitId];
  const portraitNumber = portraitOrder.indexOf(portraitId) + 1;
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const openAlbum = photoStories.find((album) => album.id === openAlbumId);
  return (
    <main className="urban-page" id="main-content">
      <a className="skip-link" href="#urban-home">Skip to content</a>
      <nav className="urban-nav" aria-label="Main navigation">
        <a href="#urban-home" className="urban-logo">{site.brand}</a>
        <div><a href="#urban-network">Timeline</a><a href="#urban-work">Projects</a><a href="#urban-papers">Papers</a><a href="#urban-life">Life</a></div>
        <span className="urban-place">{site.locationLine}</span>
      </nav>

      <section className="urban-hero" id="urban-home">
        <div className="urban-title">
          <p><span>01</span> Human behind the work</p>
          <h1>{site.name.first}<br /><i>{site.name.nickname}</i><br />{site.name.last}</h1>
          <p className="urban-chinese-name" lang="zh-CN">{site.name.chinese}</p>
          <div className="urban-role">{site.roles.map((role) => <span key={role}>{role}</span>)}</div>
        </div>

        <div className="urban-photo">
          <button className="portrait-cycle" type="button" onClick={onCyclePortrait} aria-label={`Show next portrait. Current portrait: ${portrait.label}`}>
            <img src={portrait.src} alt={portrait.alt} style={{ objectPosition: portrait.urbanPosition }} />
          </button>
          <div className="urban-sticker">{site.sticker[0]}<br />{site.sticker[1]}</div>
          <span className="urban-arrow" aria-hidden="true">↘</span>
          <span className="urban-photo-tag">{portrait.code} / P{portraitNumber} OF {portraitOrder.length} / CLICK TO CHANGE</span>
        </div>

        <div className="urban-copy">
          <div className="urban-slogan">
            <span>{site.sloganLabel}</span>
            <strong>{site.slogan[0]}<br />{site.slogan[1]}<br /><i>{site.slogan[2]}</i></strong>
          </div>
          <div className="urban-bio">{site.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <a className="urban-index-link" href="#urban-work">Explore selected work <Arrow /></a>
        </div>
        <ContactLinks />
      </section>

      <section className="urban-tape" aria-label="Current focus"><span>NOW PLAYING</span><strong>{site.focus}</strong><span>TRACK 001</span></section>

      <section className="urban-network" id="urban-network">
        <header className="urban-section-heading"><div><span>02 / BUILT, STUDIED & RESEARCHED</span><h2>EXPERIENCE<br />TIMELINE.</h2></div><p>{site.timelineRange}<br />Places that shaped the work.</p></header>
        <Timeline />
      </section>

      <section className="urban-work" id="urban-work">
        <header className="urban-section-heading"><div><span>03 / AN OPEN EXHIBITION</span><h2>SELECTED<br />OUTPUT.</h2></div><p>{site.workSubtitle}<br />Scroll through the collection →</p></header>
        <ProjectExhibition />
      </section>

      <section className="urban-papers" id="urban-papers">
        <header className="urban-section-heading"><div><span>04 / PAPERS & RESEARCH</span><h2>PUBLICATION<br />TIMELINE.</h2></div><p>Newest first.<br />Open a record to read the abstract.</p></header>
        <Publications />
      </section>

      <section className={`urban-life ${lifeExpanded ? 'is-expanded' : 'is-collapsed'}`} id="urban-life">
        <header><span>OFF HOURS / ON EARTH</span><h2>A CONTACT SHEET<br />OF THE HUMAN.</h2><p>Not a corporate timeline. Just the places and people that keep the work alive.</p></header>
        <button className="urban-life-toggle" type="button" onClick={onToggleLife} aria-expanded={lifeExpanded} aria-controls="urban-album">
          <span>{lifeExpanded ? 'COLLAPSE CONTACT SHEET' : 'EXPAND CONTACT SHEET'}</span>
          <small>{String(photoCount).padStart(2, '0')} FRAMES / {String(photoStories.length).padStart(2, '0')} ZONES</small>
          <i aria-hidden="true">{lifeExpanded ? '↑' : '↓'}</i>
        </button>
        {lifeExpanded ? (
          <div className="urban-album-index" id="urban-album">
            {photoStories.map((album, albumIndex) => (
              <button className={`urban-album-card is-${album.color}`} type="button" onClick={() => setOpenAlbumId(album.id)} key={album.id}>
                <span className="urban-album-card-code">ZONE_{String(albumIndex + 1).padStart(2, '0')} / {album.eyebrow}</span>
                <span className="urban-album-card-image"><img src={album.photos[0].src} alt="" loading="lazy" /><i>{String(album.photos.length).padStart(2, '0')} FRAMES</i></span>
                <span className="urban-album-card-copy"><strong>{album.title}</strong><small>{album.summary}</small><i>ENTER ALBUM ↗</i></span>
              </button>
            ))}
            <a className="urban-open-signal" href={site.contactHref}>
              <span className="urban-open-index">OPEN CHANNEL / 00</span>
              <span className="urban-open-copy">
                <small>NEXT CONNECTION</small>
                <strong>WANT TO BE IN<br />THE NEXT FRAME?</strong>
                <p>Say hello. Let&apos;s exchange ideas, build something, or find the next place worth remembering.</p>
              </span>
              <span className="urban-open-action">SEND A SIGNAL <Arrow /></span>
            </a>
            <button className="urban-life-toggle is-bottom" type="button" onClick={onToggleLife}><span>COLLAPSE CONTACT SHEET</span><small>RETURN TO {String(photoStories.length).padStart(2, '0')} STACKED SIGNALS</small><i aria-hidden="true">↑</i></button>
          </div>
        ) : (
          <div className="urban-collapsed-stack" id="urban-album">
            {photoStories.map((album, albumIndex) => (
              <button className={`is-${album.color}`} type="button" onClick={() => setOpenAlbumId(album.id)} aria-label={`Open ${album.title}`} key={album.id}>
                <span>ALBUM_{String(albumIndex + 1).padStart(2, '0')} / {String(album.photos.length).padStart(2, '0')} FRAMES</span>
                <span className="urban-stack-cover"><img src={album.photos[0].src} alt="" loading="lazy" /><strong>{album.title}</strong></span>
                <i>OPEN SIGNAL ↗</i>
              </button>
            ))}
          </div>
        )}
      </section>
      {openAlbum && <AlbumViewer key={openAlbum.id} album={openAlbum} onClose={() => setOpenAlbumId(null)} />}
    </main>
  );
}
