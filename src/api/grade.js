import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/grade/list',
        method: 'get',
        params: query
    });
};

export const deleteData = id => {
    return request({
        url: '/grade/delete',
        method: 'post',
        data: {id:id},
        headers: { "Content-Type": "application/json" }
    });
};

export const addData = data => {
    return request({
        url: '/grade/add',
        method: 'post',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    });
};
