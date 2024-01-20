import axios from "axios";
import { config } from "../../Constants";

const PRODUCT_REST_API_URL = `${config.url.API_BASE_URL}/products`;

// -- Axios

const instance = axios.create({
  baseURL: PRODUCT_REST_API_URL,
});

export const ProductService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getAllProductTypes,
};

function getAllProducts(params) {
  return instance.get(PRODUCT_REST_API_URL, { params }).then((response) => {
    return response;
  });
}

function getProductById(productId) {
  return instance.get(`${PRODUCT_REST_API_URL}/detail/${productId}`);
}

function createProduct(product) {
  return instance.post(PRODUCT_REST_API_URL, product);
}

function updateProduct(product) {
  return instance.put(`${PRODUCT_REST_API_URL}/update`, product);
}

function deleteProduct(productId) {
  return instance.put(`${PRODUCT_REST_API_URL}/delete/${productId}`);
}

function getAllCategories() {
  return instance.get(`${PRODUCT_REST_API_URL}/categories`).then((response) => {
    return response;
  });
}

function getAllProductTypes() {
  return instance.get(`${PRODUCT_REST_API_URL}/types`).then((response) => {
    return response;
  });
}
