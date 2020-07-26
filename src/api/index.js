import request from '../utils/request';

export const fetchData = query => {
    return request({
        // url: './table.json',
        url: '/user/list',
        method: 'get',
        params: query
    });
};
