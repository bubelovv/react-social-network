import React, {useState, useEffect} from 'react';
import styles from './Pagination.module.css';
import cn from "classnames";

interface Props {
    totalCount: number
    pageSize: number
    currentPage:  number
    onPageChanged: (pageNumber: number) => void
}

const Pagination: React.FC<Props> = ({totalCount, pageSize, onPageChanged, currentPage}) => {
    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const [portionPages, setPortionPages] = useState(1);

    useEffect(() => setPortionPages(Math.ceil(currentPage / pageSize)), [currentPage, pageSize]);

    let pagesLeft = (portionPages - 1) * pageSize + 1;
    let pagesRight = portionPages * pageSize;
    let filterPages = pages.filter(page => page >= pagesLeft && page <= pagesRight);

    return (
        <div className={styles.btnNumbersPage}>
            {portionPages > 1 &&
                <button className={cn(styles.btnArrow, styles.left)}
                        onClick={() => setPortionPages(portionPages - 1)}>prev</button>}

            {filterPages.map(page => {
                return <span key={page} onClick={() => onPageChanged(page)}
                             className={currentPage === page ? styles.selectedPage : ''}>{page}</span>
            })}

            {currentPage < pagesCount &&
                <button className={cn(styles.btnArrow, styles.right)}
                        onClick={() => setPortionPages(portionPages + 1)}>next</button>}
        </div>
    )
}

export default Pagination;