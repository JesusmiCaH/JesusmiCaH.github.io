import { organizations } from '@/content/site';
import { Arrow } from './arrow';
import { TimelineDate } from './timeline-date';

export function Timeline() {
  return (
    <ol className="record-timeline" aria-label="Experience timeline">
      {organizations.map((organization, index) => (
        <li className="record-row" key={organization.id}>
          <TimelineDate end={{ month: organization.timelineToMonth, year: organization.timelineToYear }} start={{ month: organization.timelineFromMonth, year: organization.timelineFromYear }} />
          <details className="record-card">
            <summary className="record-summary">
              <span className={`organization-mark ${organization.dark ? 'is-dark' : 'is-light'}`}><img src={organization.logo} alt="" loading="lazy" /></span>
              <span className="record-copy"><span className="record-eyebrow">CHAPTER {String(index + 1).padStart(2, '0')}</span><strong className="record-title">{organization.name}</strong><span className="record-role">{organization.role}</span><span className="record-description">{organization.summary}</span></span>
              <span className="record-toggle" aria-hidden="true">＋</span>
            </summary>
            <div className="record-details">
              <p className="record-eyebrow">Notes from this chapter</p>
              <ul>{organization.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <a className="record-link" href={organization.href} target="_blank" rel="noreferrer">Visit institution <Arrow /></a>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
