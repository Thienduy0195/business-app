import React, { useState, useEffect } from 'react';
import ProductItem from '../product-item/ProductItem';
import './product-list.css'
import { productApi } from '../../../misc/ProductApi';


const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productApi.getProductList().then((res) => {
            setProducts(res);
        })
            .catch((err) => console.error);
    }, []);



    return (
        <div className="container-fluid mt-3">
            <div className='row product-list'>

                {products.map((product, index) => (
                    <ProductItem
                        key={index}
                        name={product.name}
                        avatarURL={product.avatarURL}
                        title={product.title}
                        mainPrice={product.mainPrice}
                    />
                ))}

            </div>
        </div>
    );
};

export default ProductList;