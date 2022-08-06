import { forwardRef, LegacyRef } from 'react';

import { HEITH, WIDTH } from 'src/consts';

import styles from './styles.module.scss';

export const Canvas = forwardRef((_, ref) => (
    <div className={styles.canvas}>
      <div className={styles.canvas__container}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <canvas
          ref={ref as LegacyRef<HTMLCanvasElement>}
          height={HEITH}
          width={WIDTH}
        />
      </div>
    </div>
));
