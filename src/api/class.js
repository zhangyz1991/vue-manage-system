import request from '../utils/request';

export const fetchData = query => {
    return request({
        // url: './table.json',
        url: '/class/list',
        method: 'get',
        params: query
    });
};

export const deleteData = id => {
    return request({
        url: '/class/delete',
        method: 'post',
        data: id,
        headers: { "Content-Type": "application/json" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};

export const addData = data => {
    return request({
        url: '/class/add',
        method: 'post',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};
