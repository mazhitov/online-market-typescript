import { Product } from '../../types/types';

const sortByDate = (products:Product[]) => {
    return products.sort(function (a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
    });
};
const sortByPriceLow = (products:Product[]) => {
    return products.sort(function (a, b) {
        return b.price - a.price;
    });
};
const sortByName = (products:Product[]) => {
    return products.sort((a, b) => {
        if (a.model < b.model) {
            return -1;
        }
        if (a.model > b.model) {
            return 1;
        }
        return 0;
    })
}
const sortByPriceHigh = (products:Product[]) => {
    return products.sort((a, b) => {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    })
}
const Sort = (method:string, data:Product[]) => {
   switch (method) {
       case 'nova':
           return sortByDate(data);
       case 'priceHigh':
           return sortByPriceHigh(data);
       case 'priceLow':
           return sortByPriceLow(data);
       case 'model':
           return sortByName(data);
       default:
           return sortByDate(data);
   }
};

export default Sort;