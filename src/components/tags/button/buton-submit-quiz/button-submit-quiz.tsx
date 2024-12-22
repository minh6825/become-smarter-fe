import React from "react";
import styles from './butt-submit-quiz.module.css';

type Props = {
    onClick: () => void;
    children: React.ReactNode
    bgWave?: string
    borderColor?: string
};

const ButtonSubmit = ({ onClick, children, bgWave, borderColor }: Props) => {
  return (
    <div className={`${styles.buttons} self-end`} onClick={onClick}>
      <button className={`${styles['blob-btn']} before:border-[2px] text-black ${borderColor ?? 'before:border-primary-root-cyan'}`}>
        {children}
        <span className={styles['blob-btn__inner']}>
          <span className={`${styles['blob-btn__blobs']}`}>
            <span className={`${styles['blob-btn__blob']} ${bgWave || 'bg-primary-root-cyan'}`}></span>
            <span className={`${styles['blob-btn__blob']} ${bgWave || 'bg-primary-root-cyan'}`}></span>
            <span className={`${styles['blob-btn__blob']} ${bgWave || 'bg-primary-root-cyan'}`}></span>
            <span className={`${styles['blob-btn__blob']} ${bgWave || 'bg-primary-root-cyan'}`}></span>
          </span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{ display: "none" }}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="goo"
              ></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo"></feBlend>
            </filter>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default ButtonSubmit;
