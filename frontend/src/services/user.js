import {instance as request,protectInstance as protectRequest} from './request.js'


//用户注册
export function register(name, email, password, shippingAddress){
   return request.post('/api/user',{name, email, password, shippingAddress})
}

//用户登录
export function login(email,password){
   return request.post('/api/user/login',{email,password})
}

//个人详情查询
export function getprofile(){
   return protectRequest.get('/api/user/profile')
}

//个人详情更新
export function updateprofile(user){
   return protectRequest.put('/api/user/profile',user)
}

//获取用户列表
export function getUserList(pageNumber,pageSize){
   return protectRequest.get(`/api/user?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

//根据id删除用户
export function deleteUser(id){
   return protectRequest.delete(`/api/user/${id}`)
}

//根据id查询用户
export function getUser(id){
   return protectRequest.get(`/api/user/${id}`)
}

//根据id修改用户
export function updateUser(user){
   return protectRequest.put(`/api/user/${user._id}`,user)
}
