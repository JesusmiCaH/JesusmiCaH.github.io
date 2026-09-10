import { publications } from '@/content/site';
import { Arrow } from './arrow';
import { TimelineDate } from './timeline-date';

export function Publications() {
  return (
    <ol className="record-timeline" aria-label="Publication timeline">
      {publications.map((paper, index) => (
        <li className="record-row" key={paper.id}>
          <TimelineDate label={paper.preview ? 'Preview' : 'Published'} end={{ month: paper.month, year: paper.year }} />
          <details className={`record-card is-paper${paper.preview ? ' is-preview' : ''}`}>
            <summary className="record-summary">
              <span className="record-figure">{paper.image ? <img src={paper.image} alt={paper.imageAlt} loading="lazy" /> : <span className="record-figure-sample"><small>FIG. {String(index + 1).padStart(2, '0')}</small><strong>WORK<br />IN VIEW</strong></span>}</span>
              <span className="record-copy"><span className="record-eyebrow">{paper.status}{paper.preview && ' / NOT A PUBLICATION'}</span><strong className="record-title">{paper.title}</strong><span className="record-description">{paper.authors}</span><span className="record-hint">Read abstract</span></span>
              <span className="record-toggle" aria-hidden="true">＋</span>
            </summary>
            <div className="record-details">
              <p className="record-eyebrow">{paper.abstractLabel}</p>
              <p>{paper.abstract}</p>
              {paper.href && <a className="record-link" href={paper.href} target="_blank" rel="noreferrer">Read on {paper.linkLabel} <Arrow /></a>}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
