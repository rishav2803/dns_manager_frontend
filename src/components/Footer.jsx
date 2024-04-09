import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        <p>&copy; 2023 Taskerr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
