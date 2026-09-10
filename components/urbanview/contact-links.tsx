import { contactLinks, type ContactIconName } from '@/content/site';
import { Arrow } from './arrow';

// Functional, grid-aligned pictograms; each icon has an adjacent text label.
const paths: Record<ContactIconName, string> = {
  location: 'M6 2h8v2h2v8h-2v2h-2v2h-4v-2H6v-2H4V4h2V2zm2 4v4h4V6H8zm0 10h4v2H8z',
  email: 'M2 4h16v12H2V4zm2 2v2h2v2h2v2h4v-2h2V8h2V6h-2v2h-2v2H8V8H6V6H4zm0 4v4h12v-4h-2v2h-2v2H8v-2H6v-2H4z',
  github: 'M4 2h4v2h4V2h4v4h2v6h-2v2h-4v4H8v-2H4v-2H2v-2h2v2h4v-2H4v-2H2V6h2V2zm2 6v2h2V8H6zm6 0v2h2V8h-2z',
  linkedin: 'M2 2h4v4H2V2zm0 6h4v10H2V8zm6 0h4v2h2V8h2v2h2v8h-4v-6h-2v6H8V8z',
  orcid: 'M8 2h4v2h4v2h2v8h-2v2h-4v2H8v-2H4v-2H2V6h2V4h4V2zM6 6v2h2V6H6zm0 4v4h2v-4H6zm4-4v8h4v-2h2V8h-2V6h-4zm2 2h2v4h-2V8z',
  cv: 'M4 2h8v2h2v2h2v12H4V2zm2 2v12h8V8h-4V4H6zm0 6h6v2H6v-2zm0 3h6v2H6v-2z',
};

function PixelIcon({ name }: { name: ContactIconName }) {
  return <svg viewBox="0 0 20 20" fill="currentColor" fillRule="evenodd" shapeRendering="crispEdges" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function ContactLinks() {
  return (
    <address className="urban-contact">
      <p className="urban-contact-heading">Find me / Say hello</p>
      <div className="urban-contact-list">
        {contactLinks.map((link) => (
          <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} key={link.icon}>
            <span className="urban-contact-icon"><PixelIcon name={link.icon} /></span>
            <span className="urban-contact-copy"><span>{link.label}</span><strong>{link.value}</strong></span>
            <Arrow />
          </a>
        ))}
      </div>
    </address>
  );
}
