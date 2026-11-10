import { createContext, useContext } from 'react';

export const UiContext = createContext(null);

/**
 * App-wide UI helpers:
 *   toast(message)                    – small pill at the bottom of the screen
 *   openService(service)              – "Know More" dialog
 *   openEnquiry(title, text, service) – enquiry dialog (continues on WhatsApp)
 */
export const useUi = () => {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error('useUi must be used inside <UiProvider>');
  return ctx;
};
