import { Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext.jsx';
import { UiProvider } from './context/UiProvider.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <SiteProvider>
      <UiProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UiProvider>
    </SiteProvider>
  );
}
