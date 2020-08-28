import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.center}>

                <div className={styles.padding}>                    
                    Data provided by &nbsp;
                    <a className={styles.link}
                    href="https://www.covidtracking.com">
                        The COVID Tracking Project
                    </a>
                    .                   
                </div>
                
                <div>                    
                    Chart built using &nbsp;
                    <a className={styles.link}
                    href="https://developers.google.com/chart">
                        Google Charts
                    </a>
                    .                    
                </div>

            </div>
        </div>
    );
}

export default Footer;