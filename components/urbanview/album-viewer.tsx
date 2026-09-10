'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { AlbumSet } from '@/content/site';

export function AlbumViewer({ album, onClose }: { album: AlbumSet; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  const [activePhoto, setActivePhoto] = useState(0);
  const current = album.photos[activePhoto];
  const move = (offset: number) => setActivePhoto((index) => (index + offset + album.photos.length) % album.photos.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();
      if (event.key === 'ArrowLeft') setActivePhoto((index) => (index - 1 + album.photos.length) % album.photos.length);
      if (event.key === 'ArrowRight') setActivePhoto((index) => (index + 1) % album.photos.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      dialog?.close();
      previousFocus?.focus();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [album.photos.length]);

  const ticker = `${album.title} — ${current.title} — ${current.place} — ${current.note}`;
  return createPortal(
    <dialog ref={dialogRef} className={`urban-album-viewer is-${album.color}`} aria-label={`${album.title} album`} onCancel={() => closeRef.current()}>
      <header>
        <span>ARCHIVE SIGNAL / {album.eyebrow}</span>
        <strong>{album.title}</strong>
        <button type="button" onClick={onClose} aria-label="Close album">CLOSE ×</button>
      </header>
      <div className="urban-album-stage">
        <aside>
          <span>ALBUM NOTE</span>
          <h2>{album.title}</h2>
          <p>{album.summary}</p>
          <small>{String(activePhoto + 1).padStart(2, '0')} / {String(album.photos.length).padStart(2, '0')}</small>
        </aside>
        <figure>
          <img src={current.src} alt={current.title} />
          <figcaption><strong>{current.title}</strong><span>{current.place}</span></figcaption>
        </figure>
        <div className="urban-album-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous photograph">← PREV</button>
          <div>{album.photos.map((photo, index) => <button type="button" className={index === activePhoto ? 'is-active' : ''} onClick={() => setActivePhoto(index)} key={photo.src} aria-label={`Show ${photo.title}`} aria-pressed={index === activePhoto}>{String(index + 1).padStart(2, '0')}</button>)}</div>
          <button type="button" onClick={() => move(1)} aria-label="Next photograph">NEXT →</button>
        </div>
      </div>
      <div className="urban-album-ticker" aria-label={ticker}><span>{ticker}{' /// '}{ticker}{' /// '}</span></div>
    </dialog>,
    document.body,
  );
}
