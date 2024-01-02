import React, { useState, useEffect } from 'react';
import ProductItem from '../product-item/ProductItem';
import './product-list.css'
import { productApi } from '../../../misc/ProductApi';
import Pagination from "@material-ui/lab/Pagination";


const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [count, setCount] = useState(0);

    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page - 1;
        }
        if (pageSize) {
            params["size"] = pageSize;
        }
        return params;
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const showProducts = () => {
        const params = getRequestParams(page, pageSize);

        productApi.getProductList(params).then((response) => {
            console.log("PRODUCTS", response.data);
            setProducts(response.data.content);
            setCount(response.data.totalPages);

        })
            .catch((err) => console.error);
    };

    useEffect(showProducts, [page, pageSize]);



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
            <div className='d-flex justify-content-center'>
                <Pagination
                    color="primary"
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductList;