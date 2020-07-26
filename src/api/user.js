import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/user/list',
        method: 'get',
        params: query
    });
};

export const deleteData = id => {
    return request({
        url: '/user/delete',
        method: 'post',
        data: {id:id},
        headers: { "Content-Type": "application/json" }
    });
};

export const addData = data => {
    return request({
        url: '/user/add',
        method: 'post',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    });
};
