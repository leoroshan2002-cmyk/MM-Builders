export default function Toast({ text, on }) {
  return (
    <div id="toast" role="status" className={on ? 'on' : ''}>
      {text}
    </div>
  );
}
