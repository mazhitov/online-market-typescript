import React from 'react';
import FilterSidebar from '../filterSidebar/filterSidebar';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Fridge = () => {
    const products = useTypedSelector(state => state.products.products);
    const fridgeProducts = products.filter(pr => pr.category === 'fridge');
    return (
        <div>
            <FilterSidebar products={fridgeProducts}/>
        </div>
    );
};

export default Fridge;