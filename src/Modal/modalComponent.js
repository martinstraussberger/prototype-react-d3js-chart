import React, { useState, useRef } from 'react';
import styles from '../styles.module.scss';

import { Button, CancelButton } from '../components/buttons/buttons.tsx';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './modalTemplate';

export const RenderModal = ({ headerText }) => {
  const [showModal, setShowModal] = useState(false);
  const btnRef = useRef(null);

  if (btnRef.current?.innerHTML !== 'Defibrillation') {
    headerText = 'Wie hoch ist die elektrische Energie?';
  } else {
    headerText = 'Bitte geben Sie für Urapidil die verabreichte Menge an:';
  }

  return (
    <>
      <Button innerRef={btnRef} onClick={() => setShowModal(true)}>
        Defibrillation
      </Button>
      <Modal show={showModal} setShow={setShowModal} hideCloseButton>
        <ModalHeader>
          <h2>{headerText}</h2>
        </ModalHeader>

        <ModalBody>
          <input className={styles.modalInput} /> in Joule
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={() => setShowModal(false)}>Abbrechen</CancelButton>
          <Button onClick={() => setShowModal(false)}>Speichern</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
