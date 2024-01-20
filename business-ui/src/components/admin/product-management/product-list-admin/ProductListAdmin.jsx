import React, { useState, useEffect } from "react";
import "./product-list-admin.css";
import { ProductService } from "../../../misc/ProductService";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [count, setCount] = useState(0);

  const geTableRowequestParams = (page, pageSize) => {
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
    const params = geTableRowequestParams(page, pageSize);

    ProductService.getAllProducts(params)
      .then((response) => {
        console.log("PRODUCTS", response.data);
        setProducts(response.data.content);
        setCount(response.data.totalPages);
      })
      .catch((err) => console.error);
  };

  useEffect(showProducts, [page, pageSize]);

  const deleteItem = (id) => {
    ProductService.deleteProduct(id)
      .then(() => {
        showProducts();
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="container mt-3 product-table">
        <Table striped>
          <TableHeader>
            <TableRow className="text-center">
              <TableHeaderCell>No.</TableHeaderCell>
              <TableHeaderCell>MÃ SP</TableHeaderCell>
              <TableHeaderCell>TÊN SẢN PHẨM</TableHeaderCell>
              <TableHeaderCell>SỐ LƯỢNG</TableHeaderCell>
              <TableHeaderCell>ĐƠN VỊ TÍNH</TableHeaderCell>
              <TableHeaderCell>GIÁ VỐN</TableHeaderCell>
              <TableHeaderCell>GIÁ BÁN LẺ</TableHeaderCell>
              <TableHeaderCell>CHIẾT KHẤU (%)</TableHeaderCell>
              <TableHeaderCell>GIÁ KHUYẾN MÃI</TableHeaderCell>
              <TableHeaderCell>THAO TÁC</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((productItem, index) => {
              return (
                <TableRow
                  disabled={productItem.productFlag === 1}
                  className="text-center"
                  key={index}
                >
                  <TableCell>
                    <strong>{(page - 1) * pageSize + index + 1}</strong>
                  </TableCell>
                  <TableCell>{productItem.code}</TableCell>
                  <TableCell>{productItem.name}</TableCell>
                  <TableCell>{productItem.quantity}</TableCell>
                  <TableCell>{productItem.unit}</TableCell>
                  <TableCell>{productItem.costPrice}</TableCell>
                  <TableCell>{productItem.retailPrice}</TableCell>
                  <TableCell>{productItem.discountPercent}</TableCell>
                  <TableCell>{productItem.salePrice}</TableCell>
                  <TableCell className="d-flex justify-content-around">
                    <Link
                      as={Link}
                      to={`/edit/${productItem.id}`}
                      className="text-white"
                    >
                      <i className="fa-regular fa-pen-to-square text-primary"></i>
                    </Link>

                    <Link onClick={() => deleteItem(productItem.id)}>
                      <i className="fa-solid fa-trash text-secondary"></i>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="center">
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
