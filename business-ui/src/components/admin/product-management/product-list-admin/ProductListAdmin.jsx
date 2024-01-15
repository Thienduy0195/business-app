import React, { useState, useEffect } from "react";
import "./product-list-admin.css";
import { ProductService } from "../../../misc/ProductService";
import Pagination from "@material-ui/lab/Pagination";
import ProductItem from "../product-item/ProductItem";

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [count, setCount] = useState(0);
  const [idDelete, setIdDelete] = useState();

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

    ProductService.getAllProducts(params)
      .then((response) => {
        console.log("PRODUCTS", response.data);
        setProducts(response.data.content);
        setCount(response.data.totalPages);
      })
      .catch((err) => console.error);
  };

  useEffect(showProducts, [page, pageSize, idDelete]);

  const updateItemInLine = (changedItem) => {
    console.log("changedItem", changedItem);
    let newList = products.map((x) => {
      if (x.id === changedItem.id) {
        x = changedItem;
      }
      return x;
    });
    setProducts(newList);
  };

  const deleteItem = (id) => {
    ProductService.deleteProduct(id);
    setIdDelete(id);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <table className="w-100">
          <thead>
            <tr>
              <th className="text-center">No.</th>
              <th className="text-center">MÃ SP</th>
              <th className="text-center">TÊN SẢN PHẨM</th>
              <th className="text-center">SỐ LƯỢNG</th>
              <th className="text-center">ĐƠN VỊ TÍNH</th>
              <th className="text-center">GIÁ VỐN</th>
              <th className="text-center">GIÁ BÁN LẺ</th>
              <th className="text-center">CHIẾT KHẤU</th>
              <th className="text-center">GIÁ KHUYẾN MÃI</th>
              <th className="text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <ProductItem
                  key={index}
                  updateItemInLine={updateItemInLine}
                  //   showUpdateForm={showUpdateForm}
                  productItem={item}
                  no={(page - 1) * pageSize + index + 1}
                  deleteItem={deleteItem}
                ></ProductItem>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center">
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

export default ProductListAdmin;
