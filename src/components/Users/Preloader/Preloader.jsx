import React from 'react';
import preloader from '../../../assets/images/preloader.svg';
import styles from '../Users.module.css';

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img alt='preloader' src={preloader}/>
        </div>
    );
};

export default Preloader;