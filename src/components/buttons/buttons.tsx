import React from 'react';

import styles from '../../styles.module.scss';

type modalBtnProps = {
  onClick: () => void;
  children: any;
};

export const Button = (props: modalBtnProps) => {
  return (
    <div className={styles.defiBtn}>
      <button className={`${styles.button} ${styles.__purple}`} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
};

export const CancelButton = (props: modalBtnProps) => {
  return (
    <button className={`${styles.button} ${styles.__gray}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
