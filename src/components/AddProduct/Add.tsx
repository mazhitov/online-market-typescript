import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addProduct, editProduct } from '../../redux/products-reducer';
import { useNavigate } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newMonth = month.toString();
    if (month < 10) newMonth = '0' + month.toString();
    let newDay = day.toString();
    if (day < 10) newDay = '0' + day;
    return year + '-' + newMonth + '-' + newDay;
};
type productFormType = {
    myFormData: {
        category: '',
        company: '',
        model: '',
        price: number,
        date: string,
        description: '',
        imgUrl: '',
    }
}
const Add = () => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
        setValue,
    } = useForm<productFormType>({
        mode: "onBlur",
        defaultValues: {
            myFormData: {
                category: '',
                company: '',
                model: '',
                price: 0,
                date: getDate(),
                description: '',
                imgUrl: '',
            }
        }
    });
    const products = useTypedSelector(state => state.products.products);
    const categories = useTypedSelector(state => state.products.categories);
    const companies = useTypedSelector(state => state.products.companies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productId = useParams().id;
    useEffect(() => {
        if (productId) {
            const product = products.find(pr => pr.id === productId);
            setValue('myFormData', {
                category: product.category,
                company: product.company,
                model: product.model,
                price: product.price,
                date: product.date,
                description: product.description,
                imgUrl: product.imgUrl,
            })
        } else {
            reset();
        }
    }, [productId]);
    const onSubmit = (data:productFormType) => {
        const id = productId || (parseInt(products[products.length - 1].id) + 1).toString();
        const body = {
            id,
            ...data.myFormData,
            price: parseInt(String(data.myFormData.price)),
        }
        if(productId) {
            dispatch(editProduct(body));

        }else {
            dispatch(addProduct(body));
        }
        navigate('/product/' + id);
        reset();
    }
    return (
        <div className="p-3">
            <h3>{productId? 'Изменить товар' : 'Добавить товар'}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <select
                        className="form-control"
                        {...register("myFormData.category", {
                            required: "Выберите категорию",
                        })}
                    >
                        <option value="">Выберите категорию</option>
                        {
                            categories.map(category => (
                                <option value={category.value}
                                        key={category.value}>{category.name}</option>
                            ))
                        }
                    </select>
                    <span className="border-danger text-danger">{errors?.myFormData?.category &&
                        <p>{errors?.myFormData?.category?.message || 'Error!'}</p>
                    }</span>
                </div>
                <div className="form-group">
                    <label htmlFor="company">Компания</label>
                    <select
                        className="form-control"
                        id="company"
                        {...register("myFormData.company", {
                            required: "Выберите компанию",
                        })}
                    >
                        <option value="">Выберите компанию</option>
                        {
                            companies.map(company => (
                                <option value={company.value}
                                        key={company.value}>{company.name}</option>
                            ))
                        }
                    </select>
                    <span className="border-danger text-danger">{errors?.myFormData?.company &&
                        <p>{errors?.myFormData?.company?.message || 'Error!'}</p>
                    }</span>
                </div>
                <div className="form-group">
                    <label htmlFor="model">Название</label>
                    <input type="text"
                           id="model"
                           className="form-control"
                           {...register("myFormData.model", {
                               required: 'Введите название товара',
                           })}
                    />
                    <span className="border-danger text-danger">{errors?.myFormData?.model &&
                        <p>{errors?.myFormData?.model?.message || 'Error!'}</p>
                    }</span>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена</label>
                    <input type="number"
                           id="price"
                           className="form-control"
                           {...register("myFormData.price", {
                               required: 'Задайте цену товара',
                               validate: value => value > 0,
                           })}
                    />
                    <span className="border-danger text-danger">{errors?.myFormData?.price &&
                        <p>{errors?.myFormData?.price?.type === "required" && errors?.myFormData?.price?.message}</p>
                    }</span>
                    <span className="border-danger text-danger">{
                        <p>{errors?.myFormData?.price?.type === "validate" && 'Цена должна быть больше нуля!'}</p>
                    }</span>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Дата</label>
                    <input type="date"
                           id="date"
                           className="form-control"
                           defaultValue={getDate()}
                           {...register("myFormData.date", {
                               max: {
                                   value: getDate(),
                                   message: 'Нельзя выбрать дату будущего'
                               }
                           })}
                    />
                    <span className="border-danger text-danger">{errors?.myFormData?.date &&
                        <p>{errors?.myFormData?.date?.message || 'Error!'}</p>
                    }</span>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание товара</label>
                    <textarea className="form-control"
                              {...register("myFormData.description", {
                                  maxLength: {
                                      value: 100,
                                      message: 'Описание не должно содержать больше 100 символов',
                                  }
                              })}
                    />
                    <span className="border-danger text-danger">{errors?.myFormData?.description &&
                        <p>{errors?.myFormData?.description?.message || 'Error!'}</p>
                    }</span>
                </div>
                <div className="form-group">
                    <label htmlFor="imgUrl">Ссылка на картинку</label>
                    <input type="text" id="imgUrl" className="form-control"
                              {...register("myFormData.imgUrl", {
                                  required: 'Вставьте ссылку на картинку',
                              })}
                    />
                    <span className="border-danger text-danger">{errors?.myFormData?.imgUrl &&
                        <p>{errors?.myFormData?.imgUrl?.message || 'Error!'}</p>
                    }</span>
                </div>
                <button type="submit"
                        className="btn btn-success"
                        disabled={!isValid}
                >{productId? 'Сохранить' : 'Создать'}</button>
            </form>
        </div>
    );
};

export default Add;