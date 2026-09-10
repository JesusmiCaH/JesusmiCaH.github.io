type DatePoint = { month: string; year: string };

export function TimelineDate({ end, start, label = 'Published' }: { end: DatePoint; start?: DatePoint; label?: string }) {
  return (
    <div className="record-dates" aria-label={start ? `${start.month} ${start.year} to ${end.month} ${end.year}` : `${end.month} ${end.year}`}>
      <div className="record-date is-end">
        <span className="record-date-label">{start ? (end.month === 'Now' ? 'Current' : 'To') : label}</span>
        <time><span>{end.month}</span><strong>{end.year}</strong></time>
      </div>
      {start && <div className="record-date is-start"><span className="record-date-label">From</span><time><span>{start.month}</span><strong>{start.year}</strong></time></div>}
    </div>
  );
}
