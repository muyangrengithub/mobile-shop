import {protectInstance as request} from './request.js'


//请求购物车
export const getCart =()=>{
    return request.get('/api/cart')
}


//更新购物车
export const updateCart =(data)=>{
    return request.put('/api/cart',data)
}

//根据id删除购物车商品
export const deleteCart =(id)=>{
    return request.delete('/api/cart/'+id)
}