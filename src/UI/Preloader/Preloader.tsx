import React, {FC} from 'react';
import preloader from '../../assets/images/preloader.svg';
import styles from './Preloader.module.css';

const Preloader: FC = () => {
    return (
        <div className={styles.preloader}>
            <img alt='preloader' src={preloader}/>
        </div>
    );
};

export default Preloader;