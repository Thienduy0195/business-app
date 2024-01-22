import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  TableFooter,
  Icon,
  Button,
  FormGroup,
  FormField,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const pageSizes = [
  { key: "10", text: "10", value: 10 },
  { key: "15", text: "15", value: 15 },
  { key: "20", text: "20", value: 20 },
];

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);

  const [value, setValue] = useState();

  const geTTableRowequestParams = (page, pageSize) => {
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
    const params = geTTableRowequestParams(page, pageSize);

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
      <div className="container mt-5 product-table">
        <div>
          <Form className="searching-form">
            <FormGroup
              //  widths="equal"
              className="m-0"
            >
              <FormField
                control={Input}
                label="MÃ SẢN PHẨM"
                placeholder="Mã sản phẩm"
              />

              <FormField
                control={Input}
                label="TÊN SẢN PHẨM"
                placeholder="Tên sản phẩm"
              />

              <FormField
                control={Select}
                label="TRẠNG THÁI"
                options={options}
                placeholder="Trạng thái"
              />

              <FormField
                control={Select}
                label="SẮP XẾP"
                options={options}
                placeholder="Trạng thái"
              />
              <FormField
                className="d-flex align-items-end"
                control={Button}
                primary
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span> TÌM KIẾM</span>
              </FormField>
            </FormGroup>
            {/* <FormGroup inline>
              <label>Quantity</label>
              <FormField
                control={Radio}
                label="One"
                value="1"
                checked={value === "1"}
                onChange={(e) => setValue(e.target.value)}
              />
              <FormField
                control={Radio}
                label="Two"
                value="2"
                checked={value === "2"}
                onChange={(e) => setValue(e.target.value)}
              />
              <FormField
                control={Radio}
                label="Three"
                value="3"
                checked={value === "3"}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormGroup>

            <FormField control={Button}>Submit</FormField> */}
          </Form>
        </div>
        <Table celled selectable>
          <TableHeader fullWidth>
            <TableRow>
              <TableHeaderCell className="center">
                <select
                  className="pageSize"
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </TableHeaderCell>
              <TableHeaderCell colSpan="10">
                <NavLink to="/add-new">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                  >
                    <Icon name="clone" /> THÊM MỚI
                  </Button>
                </NavLink>

                <Button size="small">TẤT CẢ</Button>
                <Button size="small">ĐANG BÁN</Button>
                <Button size="small">ĐÃ ẨN</Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableHeader>
            <TableRow className="text-center">
              <TableHeaderCell>No.</TableHeaderCell>
              <TableHeaderCell>MÃ SP</TableHeaderCell>
              <TableHeaderCell>TÊN SẢN PHẨM</TableHeaderCell>
              <TableHeaderCell>ĐƠN VỊ TÍNH</TableHeaderCell>
              <TableHeaderCell>GIÁ VỐN</TableHeaderCell>
              <TableHeaderCell>GIÁ BÁN LẺ</TableHeaderCell>
              <TableHeaderCell>CHIẾT KHẤU (%)</TableHeaderCell>
              <TableHeaderCell>GIÁ KHUYẾN MÃI</TableHeaderCell>
              <TableHeaderCell>NHẬP KHO</TableHeaderCell>
              <TableHeaderCell>ĐÃ BÁN</TableHeaderCell>
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
                  <TableCell>{productItem.unit}</TableCell>
                  <TableCell>{productItem.costPrice}</TableCell>
                  <TableCell>{productItem.retailPrice}</TableCell>
                  <TableCell>{productItem.discountPercent}</TableCell>
                  <TableCell>{productItem.salePrice}</TableCell>
                  <TableCell>{productItem.quantity}</TableCell>
                  <TableCell>{productItem.quantity}</TableCell>
                  <TableCell>
                    <div className="d-flex justify-content-around">
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
                    </div>
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
