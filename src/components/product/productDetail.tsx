import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { deleteProduct } from '../../redux/products-reducer';
import { useNavigate } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Product } from '../../types/types';

const ProductDetail = () => {
    const products = useTypedSelector(state => state.products.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentProductId = useParams().id!;
    const product = products.find((product:Product)=> product.id === currentProductId);
    const removeProduct = () => {
        dispatch(deleteProduct(currentProductId));
        navigate('/');
    };
    return (
        <div className="card mb-2 p-4">
            <div className="p-5 w-75">
                <img src={product.imgUrl}
                     className="card-img-top"
                     alt={product.model}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{product.company}</h5>
                <p className="card-text small">{product.model}</p>
                <p className="card-text"><strong>Описание: </strong> {product.description}</p>
                <p className="card-text small"><strong>Дата поступления на склад: </strong> {product.date}</p>
                <div className="card-text">Цена: {product.price} USD</div>
            </div>
            <div className="p-3 text-right">
                <NavLink to={`/product/${product.id}/edit`}
                         className="btn btn-primary mr-3">Изменить</NavLink>
                <button className="btn btn-danger" onClick={removeProduct}>Удалить</button>
            </div>
        </div>
    );
};
export default ProductDetail;