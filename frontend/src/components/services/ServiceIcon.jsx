// Line icons for the six services. `iconKey` comes from the database.
// pathLength="1" lets the CSS "draw" the strokes when a card appears.
const ICONS = {
  design: (
    <>
      <rect pathLength="1" x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path pathLength="1" d="M8 16l.6-2.6 6.4-6.4 2 2-6.4 6.4zM13.5 8.5l2 2" />
    </>
  ),
  structure: <path pathLength="1" d="M3 17h18v2.5H3zM5 17c0-4 3-7 7-7s7 3 7 7M12 10V6.5M9.5 7.5v3M14.5 7.5v3" />,
  cube: <path pathLength="1" d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  home: <path pathLength="1" d="M3.5 11L12 4l8.5 7M6 9.5V20h12V9.5M10 20v-6h4v6" />,
  building: <path pathLength="1" d="M4 20V5h9v15M13 9h7v11M2.5 20h19M7 8h3M7 11h3M7 14h3M16 12h1.5M16 15h1.5" />,
  sofa: <path pathLength="1" d="M5 11V8a2 2 0 012-2h10a2 2 0 012 2v3M3 13a2 2 0 014 0v2h10v-2a2 2 0 014 0v4H3zM5 17v2M19 17v2" />,
};

export default function ServiceIcon({ iconKey }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[iconKey] || ICONS.design}
    </svg>
  );
}
