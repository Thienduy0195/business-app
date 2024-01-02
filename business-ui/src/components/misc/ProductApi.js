import axios from 'axios';
import { config } from '../../Constants';

export const productApi = {

    getProductList,
}

function getProductList(params) {
    const url = '/products/list'
    return instance.get(url, { params }).then((response) => {
        // console.log("HERE", response);
        return response;
    })
}


// -- Axios

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})