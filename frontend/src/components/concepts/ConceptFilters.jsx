/** Category pills above the concept gallery. */
export default function ConceptFilters({ filters, active, onSelect }) {
  return (
    <>
      {filters.map((f) => (
        <button key={f.key} className={f.key === active ? 'on' : ''} onClick={() => onSelect(f.key)}>
          {f.label}
        </button>
      ))}
    </>
  );
}
