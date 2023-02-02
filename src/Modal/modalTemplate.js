import React, { useRef } from 'react';
import styles from '../styles.module.scss';

export const Modal = (props) => {
  const modalRef = useRef();

  const showAndHideModal = [`${styles.modal} ${props.show ? styles.active : ''}`];
  return (
    <div ref={modalRef} className={showAndHideModal}>
      <div className={styles.modal__content}>
        {props.hideCloseButton && (
          <span className={styles.modal__close} onClick={() => props.setShow(false)}>
            &times;
          </span>
        )}
        {props.children}
      </div>
    </div>
  );
};

export const ModalHeader = (props) => {
  return <div className={styles.modal__header}>{props.children}</div>;
};

export const ModalBody = (props) => {
  return <div className={styles.modal__body}>{props.children}</div>;
};

export const ModalFooter = (props) => {
  return <div className={styles.modal__footer}>{props.children}</div>;
};
