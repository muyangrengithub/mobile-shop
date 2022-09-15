import {protectInstance as protectRequest} from './request.js'


//创建订单
export const createOrder =(order)=>{
    return protectRequest.post('/api/orders',order)
}


//根据id获取单个订单
export const getOrderById =(id)=>{
    return protectRequest.get(`/api/orders/${id}`)
}

//获取所有订单
export const getOrders =(pageNumber,pageSize)=>{
    return protectRequest.get(`/api/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

//支付成功后修改订单支付状态
export const updateOrderToPaid =(id)=>{
    return protectRequest.put(`/api/orders/${id}/pay`)
}

//获取登录用户订单
export const getMyOrders =()=>{
    return protectRequest.get(`/api/orders/myorders`)
}


//修改订单发货状态
export const updateOrderToDelivered =(id)=>{
    return protectRequest.put(`/api/orders/${id}/deliver`)
}
