import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import sort from '../filterSidebar/sort';
import Pagination from '../Pagination/pagination';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Product } from '../../types/types';

const Nova = () => {
    const products = useTypedSelector(state => state.products.products);
    const sortProducts = sort('nova',[...products]);
    const [novaProducts] = useState(sortProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProduct = novaProducts.slice(firstProductIndex, lastProductIndex);
    const numberPages = Math.ceil(novaProducts.length / productsPerPage);
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prevState => prevState + 1);
    const prevPage = () => setCurrentPage(prevState => prevState - 1);

    return (
        <div className="p-3 card">
            <h3>Новинки</h3>
            <div className="list-group">
                {currentProduct.map((product:Product) => (
                    <NavLink to={'/product/' + product.id}
                             key={product.id.toString()}
                             className="text-left btn"
                             >
                        <div className="list-group-item">
                            <span className="mr-3">{product.category}</span>
                            <span className="mr-3">{product.company}</span>
                            <span className="mr-3">{product.model}</span>
                            <span className="mr-3">{product.price}$</span>
                        </div>
                    </NavLink>
                ))
                }
            </div>
            <Pagination totalProducts={numberPages} paginate={paginate}/>
            <div>
                <button className="btn btn-primary mr-3" onClick={prevPage}
                        disabled={currentPage===1}
                >Prev</button>
                <button className="btn btn-primary" onClick={nextPage} disabled={currentPage === numberPages}>Next</button>
            </div>
        </div>
    );
};

export default Nova;