import React, {useState, useEffect} from 'react';
import styles from './Pagination.module.css';
import cn from 'classnames';
import {usePagination} from '../../hooks/usePagination';

interface Props {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({totalCount, pageSize, onPageChanged, currentPage}) => {
    const [portionPages, setPortionPages] = useState(1);
    const [filterPages, totalPages] = usePagination(totalCount, pageSize, portionPages);

    useEffect(() => {
        setPortionPages(Math.ceil(currentPage / pageSize))
    }, [currentPage, pageSize]);


    return (
        <div className={styles.btnNumbersPage}>
            {portionPages > 1 &&
                <button className={cn(styles.btnArrow, styles.left)}
                        onClick={() => setPortionPages(portionPages - 1)}>prev</button>}

            {typeof filterPages !== 'number' && filterPages.map(page => {
                return <span key={page} onClick={() => onPageChanged(page)}
                             className={currentPage === page ? styles.selectedPage : ''}>{page}</span>;
            })}

            {currentPage < totalPages &&
                <button className={cn(styles.btnArrow, styles.right)}
                        onClick={() => setPortionPages(portionPages + 1)}>next</button>}
        </div>
    );
};

export default Pagination;