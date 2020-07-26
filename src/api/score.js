import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/score/list',
        method: 'get',
        params: query
    });
};

export const prepareData = examId => {
    return request({
        url: '/score/prepare',
        methhod: 'get',
        params: {examId:examId}
    })
}

export const deleteData = id => {
    return request({
        url: '/score/delete',
        method: 'post',
        data: id,
        headers: { "Content-Type": "application/json" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};

export const addData = data => {
    return request({
        url: '/score/add',
        method: 'post',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};

export const updateData = data => {
    return request({
        url: '/score/update',
        method: 'post',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};
