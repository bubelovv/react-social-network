import React from 'react';
import styles from '.././Users.module.css';

const Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let pagesLeft = props.currentPage - 4 < 0 ? 0 : props.currentPage - 4;
    let pagesRight = props.currentPage + 3 > pagesCount ? pagesCount : props.currentPage + 3;
    let pagesSlice = pages.slice(pagesLeft, pagesRight);

    return (
        <div className={styles.userArea}>
            <div className={styles.btnNumbersPage}>
                {pagesSlice.map(page => {
                    return <span key={page} onClick={() => props.onPageChanged(page)}
                                 className={props.currentPage === page ? styles.selectedPage : ''}>{page}</span>
                })}
            </div>
        </div>
    )
}

export default Pagination;