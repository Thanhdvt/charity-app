import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.2.13:5000',
});

export const get = async (path, options = {}) => {
    return await request.get(path, options);
};

export const post = async (path, data = {}, options = {}) => {
    return await request.post(path, data, options);
};

export const put = async (path, data = {}, options = {}) => {
    return await request.put(path, data, options);
};

export const del = async (path, options = {}) => {
    return await request.delete(path, options);
};

export default request;
