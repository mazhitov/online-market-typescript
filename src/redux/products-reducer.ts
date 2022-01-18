import { Product } from '../types/types';

const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
let initialState = {
    products: [
        {
            id: "1",
            category: "tv",
            company: "lg",
            model: "G2105",
            price: 1000,
            date: "2021-01-12",
            description: "Good stuff",
            imgUrl: 'https://images.samsung.com/is/image/samsung/levant-uhd-tu8000-ua43tu8000uxtw-frontblack-229856295?$720_576_PNG$',
        },
        {
            id: "2",
            category: "cutter",
            company: "moulinex",
            model: "Insaneone",
            price: 250.26,
            date: "2022-01-10",
            description: "Good stuff",
            imgUrl: 'https://proza.ru/pics/2013/07/22/1690.jpg',
        },
        {
            id: "3",
            category: "fridge",
            company: "moulinex",
            model: "SuperPuper",
            price: 999.99,
            date: "2022-01-08",
            description: "Good stuff",
            imgUrl: 'data:image/jpeg;base64,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',
        },
        {
            id: "4",
            category: "tv",
            company: "indesit",
            model: "ABS150",
            price: 230,
            date: "2020-01-12",
            description: "Good stuff",
            imgUrl: 'https://images.samsung.com/is/image/samsung/levant-uhd-tu8000-ua43tu8000uxtw-frontblack-229856295?$720_576_PNG$',
        },
        {
            id: "5",
            category: "cutter",
            company: "indesit",
            model: "DiS",
            price: 1200,
            date: "2012-01-10",
            description: "Good stuff",
            imgUrl: 'https://proza.ru/pics/2013/07/22/1690.jpg',
        },
        {
            id: "6",
            category: "fridge",
            company: "indesit",
            model: "mo15",
            price: 200,
            date: "2018-01-08",
            description: "Good stuff",
            imgUrl: 'data:image/jpeg;base64,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',
        },
    ],
    categories: [
        {name: 'Телевизор', value: 'tv'},
        {name: 'Холодильник', value: 'fridge'},
        {name: 'Хренорезка', value: 'cutter'},
    ],
    companies: [
        {name: 'Indesit', value: 'indesit'},
        {name: 'LG', value: 'lg'},
        {name: 'Moulinex', value: 'moulinex'},
    ],
};
const products = (state = initialState, action:any) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.product],
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => {
                    if(product.id === action.product.id) {
                        return {
                            ...product,
                            ...action.product,
                        }
                    }
                    return product;
                }),
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: [...state.products.filter(product => product.id !== action.productId)],
            };
        default:
            return state;
    }

};
export const addProduct = (product:Product) => {
    return {type: ADD_PRODUCT, product}
};
export const editProduct = (product:Product) => {
    return {type: EDIT_PRODUCT, product}
};
export const deleteProduct = (productId:string) => {
    return {type: DELETE_PRODUCT, productId}
};
export default products;