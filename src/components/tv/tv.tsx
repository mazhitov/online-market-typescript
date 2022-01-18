import React from 'react';
import FilterSidebar from '../filterSidebar/filterSidebar';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Tv = () => {
    const products = useTypedSelector(state => state.products.products);
    const tvProducts = products.filter(pr => pr.category === 'tv');
    return (
        <div>
            <FilterSidebar products={tvProducts}/>
        </div>
    );
};

export default Tv;