import React, {useState, useEffect} from 'react';
import styles from './Pagination.module.css';

const Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const [portionPages, setPortionPages] = useState(1);

    useEffect(() => setPortionPages(Math.ceil(props.currentPage / props.pageSize)), [props.currentPage]);

    let pagesLeft = (portionPages - 1) * props.pageSize + 1;
    let pagesRight = portionPages * props.pageSize;
    let filterPages = pages.filter(page => page >= pagesLeft && page <= pagesRight);

    return (
        <div className={styles.btnNumbersPage}>

            {portionPages > 1 &&
                <button className={styles.btnArrow + ' ' + styles.left} onClick={() => setPortionPages(portionPages - 1)}>prev</button>}


            {filterPages.map(page => {
                return <span key={page} onClick={() => props.onPageChanged(page)}
                             className={props.currentPage === page ? styles.selectedPage : ''}>{page}</span>
            })}

            {props.currentPage < pagesCount &&
                <button className={styles.btnArrow + ' ' + styles.right} onClick={() => setPortionPages(portionPages + 1)}>next</button>}

        </div>
    )
}

export default Pagination;