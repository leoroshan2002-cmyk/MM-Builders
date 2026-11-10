import { useEffect, useRef } from 'react';

/**
 * Native <dialog> wrapper: Esc closes it, clicking the dark backdrop closes it.
 */
export default function Modal({ open, onClose, className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={className}
      onClose={() => open && onClose()}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <button className="x" type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      {children}
    </dialog>
  );
}
