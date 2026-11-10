/** Round badge on the About photo: rotating "DESIGN • PLAN • BUILD • BELONG" text around a little house. */
export default function RotatingBadge() {
  return (
    <div className="a2-badge" aria-hidden="true">
      <svg className="r" viewBox="0 0 120 120">
        <defs>
          <path id="a2cp" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text>
          <textPath href="#a2cp" textLength="280" lengthAdjust="spacing">
            DESIGN • PLAN • BUILD • BELONG •{' '}
          </textPath>
        </text>
      </svg>
      <svg className="h" viewBox="0 0 24 24">
        <path d="M3.5 11L12 4l8.5 7M6 9.5V20h12V9.5M10 20v-6h4v6" />
      </svg>
    </div>
  );
}
