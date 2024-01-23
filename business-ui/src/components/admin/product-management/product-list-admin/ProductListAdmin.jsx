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

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);

  //attributes for searching
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);
  const [productFlag, setProductFlag] = useState(5);

  const [searchingParams, setSearchingParams] = useState({});
  const [oldPrs, setOldPrs] = useState({});

  //selection list
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const options = [
    { key: "1", text: "Bán Chạy", value: "SALE-DESC" },
    { key: "2", text: "Tồn Kho", value: "SALE-ASC" },
  ];

  const handleInputChange = (e, { name, value }) => {
    setSearchingParams((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showProducts(true);
  };

  useEffect(() => {
    ProductService.getAllCategories()
      .then((res) => {
        const categoryArray = res.data.map((item) => {
          return {
            key: item.categoryCode,
            text: item.categoryName,
            value: item.categoryId,
          };
        });
        setCategories(categoryArray);
      })
      .catch((err1) => console.error);
    ProductService.getAllProductTypes()
      .then((res) => {
        const productTypeArray = res.data.map((item) => {
          return {
            key: item.productTypeId,
            text: item.productTypeName,
            value: item.productTypeId,
          };
        });
        setProductTypes(productTypeArray);
      })
      .catch((err2) => console.error);
  }, []);

  const getSearchingParams = (page, pageSize, productFlag, obj) => {
    let params = obj;

    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["pageSize"] = pageSize;
    }
    params["productFlag"] = productFlag;
    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const showProducts = (search) => {
    console.log("search", search);
    let params = {};
    if (search === true) {
      params = getSearchingParams(page, pageSize, productFlag, searchingParams);
      console.log("params true", params);
      ProductService.getAllProducts(params)
        .then((response) => {
          console.log("PRODUCTS", response.data);
          setProducts(response.data.content);
          setTotalElement(response.data.totalPages);
          setOldPrs(searchingParams);
        })
        .catch((err) => console.error);
    } else {
      params = getSearchingParams(page, pageSize, productFlag, oldPrs);
      console.log("params false", params);
      ProductService.getAllProducts(params)
        .then((response) => {
          console.log("PRODUCTS", response.data);
          setProducts(response.data.content);
          setTotalElement(response.data.totalPages);
        })
        .catch((err) => console.error);
    }
  };

  useEffect(showProducts, [page, pageSize, productFlag]);

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
          <Form className="searching-form" onSubmit={handleSubmit}>
            <FormGroup
              //  widths="equal"
              className="m-0 row"
            >
              <FormField
                className="col-lg-2 col-md-6 mb-2"
                control={Input}
                label="MÃ SẢN PHẨM"
                placeholder="Mã sản phẩm"
                name="code"
                value={searchingParams.code}
                onChange={handleInputChange}
              />

              <FormField
                className="col-lg-2 col-md-6 mb-2"
                control={Input}
                label="TÊN SẢN PHẨM"
                placeholder="Tên sản phẩm"
                name="name"
                value={searchingParams.name}
                onChange={handleInputChange}
              />

              <FormField
                className="col-lg-2 col-md-6 mb-2"
                control={Select}
                label="DANH MỤC"
                options={categories}
                placeholder="Vui lòng chọn"
                name="categoryId"
                value={searchingParams.categoryId}
                onChange={handleInputChange}
              />

              <FormField
                className="col-lg-2 col-md-6 mb-2"
                control={Select}
                label="DÒNG SẢN PHẨM"
                options={productTypes}
                placeholder="Vui lòng chọn"
                name="productTypeId"
                value={searchingParams.productTypeId}
                onChange={handleInputChange}
              />

              <FormField
                className="col-lg-2 col-md-6 mb-2"
                control={Select}
                label="SẮP XẾP"
                options={options}
                placeholder="Vui lòng chọn"
                name="sortType"
                value={searchingParams.sortType}
                onChange={handleInputChange}
              />
              <div className="d-flex align-items-end col-lg-2 col-md-6 mb-2">
                <Button primary size="medium">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <span> TÌM KIẾM </span>
                </Button>
              </div>
            </FormGroup>
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
              <TableHeaderCell colSpan="11">
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

                <Button
                  size="small"
                  onClick={() => {
                    setProductFlag(5);
                    setPage(1);
                  }}
                >
                  TẤT CẢ
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setProductFlag(1);
                    setPage(1);
                  }}
                >
                  ĐANG BÁN
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setProductFlag(0);
                    setPage(1);
                  }}
                >
                  ĐÃ ẨN
                </Button>
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
              <TableHeaderCell>TỒN KHO</TableHeaderCell>
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
                  <TableCell>{productItem.soldQuantity}</TableCell>
                  <TableCell>{productItem.remainingQuantity}</TableCell>
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
          count={totalElement}
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
