import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UiContext } from './UiContext.js';
import Toast from '../components/common/Toast.jsx';
import Modal from '../components/common/Modal.jsx';
import ServiceDetails from '../components/services/ServiceDetails.jsx';
import EnquiryForm from '../components/contact/EnquiryForm.jsx';

/** Owns the toast + the shared dialog (service details / enquiry form). See UiContext.js for the API. */
export function UiProvider({ children }) {
  const [toastState, setToastState] = useState({ text: '', on: false });
  const [dialog, setDialog] = useState(null); // null | {type:'service',service} | {type:'enquiry',title,message,service}
  const timer = useRef();

  const toast = useCallback((text) => {
    clearTimeout(timer.current);
    setToastState({ text, on: true });
    timer.current = setTimeout(() => setToastState((s) => ({ ...s, on: false })), 2200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const openService = useCallback((service) => setDialog({ type: 'service', service }), []);
  const openEnquiry = useCallback(
    (title = 'Send an Enquiry', message = '', service = '') => setDialog({ type: 'enquiry', title, message, service }),
    []
  );
  const closeDialog = useCallback(() => setDialog(null), []);

  const value = useMemo(() => ({ toast, openService, openEnquiry }), [toast, openService, openEnquiry]);

  return (
    <UiContext.Provider value={value}>
      {children}

      <Modal open={!!dialog} onClose={closeDialog} className={dialog?.type === 'service' ? 'svd' : ''}>
        {dialog?.type === 'service' && (
          <ServiceDetails service={dialog.service} onDiscuss={() => openEnquiry(dialog.service.title, `I'm interested in ${dialog.service.title}.`, dialog.service.title)} />
        )}
        {dialog?.type === 'enquiry' && (
          <EnquiryForm key={dialog.title} title={dialog.title} initialMessage={dialog.message} service={dialog.service} onDone={closeDialog} />
        )}
      </Modal>

      <Toast text={toastState.text} on={toastState.on} />
    </UiContext.Provider>
  );
}
