import { useEffect, useRef, useState } from 'react';
import useInView from '../../hooks/useInView.js';

/**
 * A picture frame that reveals its image on scroll.
 * Behaves like the original "image slot": you can also drop an image file on it to preview a replacement.
 * (The upload button is hidden whenever an image is showing.)
 */
export default function ImageSlot({ name, alt, size, src, dark = false, reveal = false, className = '', style }) {
  const [ref, inView] = useInView();
  const fileInput = useRef(null);
  const [current, setCurrent] = useState(src || null);
  const [failed, setFailed] = useState(false);
  const objectUrl = useRef(null);

  useEffect(() => {
    setCurrent(src || null);
    setFailed(false);
  }, [src]);

  useEffect(() => () => objectUrl.current && URL.revokeObjectURL(objectUrl.current), []);

  const applyFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setFailed(false);
    setCurrent(objectUrl.current);
  };

  const has = current && !failed;
  const classes = ['slot', dark && 'dk', has && 'has', reveal && 'rv', inView && 'in', className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      data-name={name}
      data-alt={alt}
      data-size={size}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        applyFile(e.dataTransfer.files[0]);
      }}
    >
      {current && <img src={current} alt={alt} decoding="async" loading="lazy" onError={() => setFailed(true)} hidden={failed} />}
      <span className="rev" />
      <button
        className="pick"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fileInput.current?.click();
        }}
      >
        ＋ Image slot: {name} ({size})
      </button>
      <input ref={fileInput} type="file" accept="image/*" hidden onChange={(e) => { applyFile(e.target.files[0]); e.target.value = ''; }} />
    </div>
  );
}
