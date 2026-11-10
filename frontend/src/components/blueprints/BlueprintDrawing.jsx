/** Decorative line drawing (house plan + 3D block) that draws itself in the section corner. */
export default function BlueprintDrawing() {
  return (
    <svg className="bp-draw" viewBox="0 0 400 260" aria-hidden="true">
      <g>
        <path pathLength="1" d="M40 220V110L160 40l120 70v110z" />
        <path pathLength="1" d="M20 220h280" />
        <path pathLength="1" d="M90 220v-60h40v60M170 150h70v40h-70M60 125h24M236 125h24" />
        <path pathLength="1" d="M160 40V20M160 20l14 8" />
      </g>
      <g className="d2">
        <path pathLength="1" d="M300 40h70v180h-70zM300 90h70M300 140h70M300 190h70" />
        <path pathLength="1" d="M40 238h240M40 232v12M280 232v12" />
        <path pathLength="1" d="M386 40v180M380 40h12M380 220h12" />
      </g>
      <text x="150" y="254">PLAN</text>
      <text x="324" y="30">3D</text>
    </svg>
  );
}
