import axios from 'axios';
import { config } from '../../Constants';

export const productApi = {

    getProductList,
}


function getProductList() {
    const url = '/products/list'
    return instance.get(url).then((response) => {
        return response.data;
    })
}

// -- Axios

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})