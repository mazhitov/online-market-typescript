import React, { FC, useState } from 'react';
import Products from "../products/products";
import {useForm} from "react-hook-form";
import sort from "./sort";
import { Product } from '../../types/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
interface filterSidebarProps {
    products: Product[],
}
type filterFormPriceType = {
    startPrice:string,
    endPrice:string,
}
const FilterSidebar:FC<filterSidebarProps> = ({products}) => {
    let [filterProducts, setProducts] = useState([...products]);
    let [selectedSort, setSelectedSort] = useState('nova');
    let [selectedCompany, setSelectedCompany] = useState('');
    const companies = useTypedSelector(state => state.products.companies);

    const {register, handleSubmit, reset, formState: {isValid}} = useForm<filterFormPriceType>({mode: "onBlur"});
    const onSubmit = (data:filterFormPriceType) => {
        setProducts(products.filter(pr => pr.price >= parseInt(data.startPrice) && pr.price <= parseInt(data.endPrice)));
    };
    const onSelectSort:React.ChangeEventHandler<HTMLSelectElement>  = (event) => {
        setSelectedSort(event.target.value);
        const data = sort(event.target.value, products);
        setProducts([...data]);
    };
    const onResetFilter = () => {
      reset();
      setSelectedSort('');
      setProducts([...products]);
    };
    const onSelectCompany:React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSelectedCompany(e.target.value);
        const data = products.filter(product => product.company === e.target.value);
        setProducts([...data]);
    };
    return (
        <div>
            <div className="col-5 ml-auto  mb-3">
                <select onChange={onSelectSort} className="form-control" value={selectedSort}>
                    <option value="nova">Сначала новинки</option>
                    <option value="priceHigh">Цена повозрастанию</option>
                    <option value="priceLow">Цена поубыванию</option>
                    <option value="model">По названию</option>
                </select>
            </div>
            <div className="row">
                <div className="col-4">
                    <button type="button"
                            className="btn btn-primary align-self-center"
                            onClick={onResetFilter}
                    >Сбросить все фильтры
                    </button>
                    <form className="pt-2"
                          onSubmit={handleSubmit(onSubmit)}>
                        <p className="card-header p-0">Цена</p>
                        <div className="p-3 pt-1 row">
                            <div className="col-4 p-0">
                                <input type="number"
                                       {...register('startPrice', {
                                           required: true,
                                           validate: value => parseInt(value) > 0,
                                       })}
                                       className="form-control"
                                       placeholder="от"/>
                            </div>
                            <div className="col-6 p-0">
                                <input type="number"
                                       {...register('endPrice', {validate: value => parseInt(value) > 0})}
                                       className="form-control"
                                       placeholder="до"/>
                            </div>
                            <div className="col-2 p-0">
                                <button type="submit"
                                        disabled={!isValid}
                                        className="btn btn-success">
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="form-group">
                        <h4>Компания</h4>
                        <select onChange={onSelectCompany} className="form-control" value={selectedCompany}>
                            {
                                companies.map(company => (
                                    <option value={company.value} key={company.value}>{company.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col">
                    <Products products={filterProducts}/>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;