import useInView from '../../hooks/useInView.js';

/**
 * Fades / slides its content in when it scrolls into view.
 *   <Reveal as="h2" className="t" delay=".1s">Title</Reveal>
 * The element gets the original "rv" class, plus "in" once visible.
 */
export default function Reveal({ as: Tag = 'div', delay, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView();
  const merged = delay ? { '--d': delay, ...style } : style;
  return (
    <Tag ref={ref} className={`rv${inView ? ' in' : ''}${className ? ` ${className}` : ''}`} style={merged} {...rest}>
      {children}
    </Tag>
  );
}
