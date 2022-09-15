import {instance as request,protectInstance as protectRequest} from './request'


//请求商品列表
export function getProducts(keyword,pageNumber,pageSize){
    return request.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

//根据id获取单个商品
export function getProduct(id){
    return request.get('/api/products/'+id)
}

//根据id删除单个商品
export function deleteProduct(id){
    return protectRequest.delete('/api/products/'+id)
}

//创建商品
export function createProduct(product){
    return protectRequest.post('/api/products',product)
}

//更新商品
export function updateProduct(product){
    return protectRequest.put('/api/products/'+product._id,product)
}

//商品图片上传
export function uploadProductImage(formData){
    const config = {
        headers: {
          'Content-Type': 'multerpart/form-data',
        },
      }
    return protectRequest.post('/api/upload',formData,config)
} 

//创建产品评论
export function createProductReview(productId, review){
    return protectRequest.post( `/api/products/${productId}/reviews`,review,)
}

//创建产品评论
export function getProductTop(){
    return request.get('/api/products/top')
}