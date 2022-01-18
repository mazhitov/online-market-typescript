import React, { FC } from 'react';
interface PaginationProps  {
    totalProducts:number,
    paginate(pageNumber:number): any,
}
const Pagination:FC<PaginationProps> = ({totalProducts, paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalProducts; i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <nav aria-label="...">
                <ul className="pagination">
                    {
                        pageNumbers.map(number => (
                            <li className="page-item" key={number}>
                                <a className="page-link"
                                   href="#"
                                    onClick={() => paginate(number)}
                                >{number}</a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;