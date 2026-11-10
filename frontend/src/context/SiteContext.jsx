import { createContext, useContext, useEffect, useState } from 'react';
import fallbackSite from '../data/fallbackSite.js';
import { fetchSiteContent } from '../services/api.js';

const SiteContext = createContext(null);

/**
 * Loads the website content (services, concepts, blueprints, contact details) from the API.
 * The page renders instantly with the bundled copy and swaps to the live data when it arrives.
 * If the API is offline the bundled copy simply stays.
 */
export function SiteProvider({ children }) {
  const [site, setSite] = useState(fallbackSite);
  const [source, setSource] = useState('fallback'); // 'fallback' | 'api'

  useEffect(() => {
    let active = true;
    fetchSiteContent()
      .then((data) => {
        if (!active || !data?.services?.length) return;
        setSite({ ...fallbackSite, ...data, settings: data.settings || fallbackSite.settings });
        setSource('api');
      })
      .catch(() => {
        if (active) console.info('[MM Builders] API unreachable – showing bundled content.');
      });
    return () => {
      active = false;
    };
  }, []);

  return <SiteContext.Provider value={{ ...site, source }}>{children}</SiteContext.Provider>;
}

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
};
