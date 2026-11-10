/** The four pillars shown on the card that overlaps the About photo. */
export default function FeatureStrip() {
  return (
    <div className="a2-feat">
      <div className="a2-f">
        <svg className="a2-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path pathLength="1" d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path pathLength="1" d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path pathLength="1" d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path pathLength="1" d="M10 6h4M10 10h4M10 14h4M10 18h4"/>
        </svg>
        <span>
          Thoughtful
          <br />
          Design
        </span>
      </div>
      <div className="a2-f">
        <svg className="a2-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect pathLength="1" x="3" y="3" width="18" height="18" rx="2"/><path pathLength="1" d="M3 9h8M11 3v12M11 15h10M16 9h5M7 21v-6"/>
        </svg>
        <span>
          Practical
          <br />
          Planning
        </span>
      </div>
      <div className="a2-f">
        <svg className="a2-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path pathLength="1" d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path pathLength="1" d="M14 6a6 6 0 0 1 6 6v3"/><path pathLength="1" d="M4 15v-3a6 6 0 0 1 6-6"/><rect pathLength="1" x="2" y="15" width="20" height="4" rx="1"/>
        </svg>
        <span>
          Quality
          <br />
          Construction
        </span>
      </div>
      <div className="a2-f">
        <svg className="a2-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path pathLength="1" d="m11 17 2 2a1 1 0 1 0 3-3"/><path pathLength="1" d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path pathLength="1" d="m21 3 1 11h-2"/><path pathLength="1" d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path pathLength="1" d="M3 4h8"/>
        </svg>
        <span>
          Personalized
          <br />
          Approach
        </span>
      </div>
    </div>
  );
}
