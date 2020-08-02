import React from 'react';

import styles from './Header.module.css';
import avatar from '../images/mooBlue.jpg';
import titleLogo from '../images/moovid-logo.png'

const Header = () => {
    return (
        <div className={styles.header}>                 
            <img className={`${styles.headerlogo} center-image`} src={avatar} alt="avatar" />
            <img className="center-image" src={titleLogo} alt="logo" />
        </div>
    );
}

export default Header;