import React from 'react';
import FilterSidebar from "../filterSidebar/filterSidebar";
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Cutter = () => {
    const products = useTypedSelector(state => state.products.products);
    const cutterProducts = products.filter(pr => pr.category === 'cutter');
    return (
        <div>
            <FilterSidebar products={cutterProducts}/>
        </div>
    );
};

export default Cutter;