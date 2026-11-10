import { Link } from 'react-router-dom';

// Simple page built with Tailwind utility classes.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-night px-6 text-center text-white">
      <img src="/images/logo.webp" alt="MM Builders & Infrastructure" className="h-24 w-auto" />
      <h1 className="font-serif text-6xl text-gold">404</h1>
      <p className="max-w-md text-mist">The page you are looking for does not exist.</p>
      <Link to="/" className="rounded-full bg-gradient-to-br from-gold to-gold-deep px-6 py-3 text-sm font-semibold text-ink no-underline">
        Back to home
      </Link>
    </div>
  );
}
