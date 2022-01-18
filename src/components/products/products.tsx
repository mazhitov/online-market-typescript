import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Pagination from '../Pagination/pagination';
import { Product } from '../../types/types';

interface ProductsProps {
    products: Product[];
}

const Products:FC<ProductsProps> = ({products}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProduct = products.slice(firstProductIndex, lastProductIndex);
    const numberPages = Math.ceil(products.length / productsPerPage);
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prevState => prevState + 1);
    const prevPage = () => setCurrentPage(prevState => prevState - 1);
    return (
        <div>
            <div className="row">
                {currentProduct.map(product => (
                    <div className="card mr-2 mb-2 d-flex flex-column"
                         style={{width: '18rem'}}
                         key={product.id}
                    >
                        <img src={product.imgUrl}
                             className="card-img-top flex-grow-1"
                             alt={product.model}/>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{product.model}</h5>
                            <p className="card-text flex-grow-1">{product.description}</p>
                            <NavLink
                                className="btn btn-primary align-self-center" to={`/product/${product.id}`}>Подробнее</NavLink>
                        </div>
                    </div>
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

export default Products;