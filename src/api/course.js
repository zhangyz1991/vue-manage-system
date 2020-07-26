import request from '../utils/request';

export const fetchData = query => {
    return request({
        // url: './table.json',
        url: '/course/list',
        method: 'get',
        params: query
    });
};

export const fetchExamCourseListData = examId => {
    return request({
        url: '/course/list/'+examId,
        method: 'get'
    });
};

export const deleteData = id => {
    return request({
        url: '/course/delete',
        method: 'post',
        data: id,
        headers: { "Content-Type": "application/json" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};

export const addData = data => {
    return request({
        url: '/course/add',
        method: 'post',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
        //,transformRequest(data, headers) { return JSON.stringify(data); }
    });
};
