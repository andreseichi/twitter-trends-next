import Image from 'next/image';
import logo from '../../../public/images/twitter.svg';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Image src={logo} alt="Twitter logo" />
      <h1>Twitter Trends</h1>
    </header>
  );
};
