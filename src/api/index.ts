import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};

export const fetchOrderId = () => {
    return request({
        url: './order_id.json',
        method: 'get'
    });
}
