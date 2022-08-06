import { FC } from 'react';

import { multipleClasses } from 'src/helpers/multipleClasses';

import styles from './styles.module.scss';

export const Sidebar: FC = ({ children }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__arrow_wr}>
        <span
          className={multipleClasses(
            styles.arrow,
            'material-icons-outlined dropdown__arrow',
          )}
        >
          keyboard_arrow_down
        </span>
      </div>
      <div className={styles.variants}>{children}</div>
    </div>
  );
};
