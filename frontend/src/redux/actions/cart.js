import {
    Cart_LIST_REQUEST,
    Cart_LIST_SUCCESS,
    Cart_LIST_FAIL,
    Cart_UPDATE_REQUEST,
    Cart_UPDATE_SUCCESS,
    Cart_UPDATE_FAIL,
    Cart_DELETE_REQUEST,
    Cart_DELETE_SUCCESS,
    Cart_DELETE_FAIL,
    Shipping_Save,
    PaymentMethod_Save
} from '../constant.js'
import {getCart,updateCart,deleteCart} from '../../services/cart.js'

//获取购物车列表
export const cartList = ()=>async(dispatch)=>{
    try {
     
        dispatch({type:Cart_LIST_REQUEST})
        const data = await getCart()
        dispatch({type:Cart_LIST_SUCCESS,payload:data})
    } catch (error) {
     
        dispatch({
          type: Cart_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

//更新购物车
export const cartUpdate = (json)=>async(dispatch)=>{
  try {
      dispatch({type:Cart_UPDATE_REQUEST})
      const data = await updateCart(json)
      dispatch({type:Cart_UPDATE_SUCCESS,payload:data})
  } catch (error) {
      dispatch({
        type: Cart_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

//删除购物车商品
export const cartDelete = (id)=>async(dispatch)=>{
  try {
      dispatch({type:Cart_DELETE_REQUEST})
      const data = await deleteCart(id)
      dispatch({type:Cart_DELETE_SUCCESS,payload:data})
  } catch (error) {
      dispatch({
        type: Cart_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}



//保存收货地址
export const shippingSave = (shippingAdress)=>{
  localStorage.setItem('shippingAdress',JSON.stringify(shippingAdress))
  return{type:Shipping_Save,payload:shippingAdress}
  
}    

//保存支付方式
export const paymentMethodSave = (data)=>{
  localStorage.setItem('paymentMethod',data)
  return{type:PaymentMethod_Save,payload:data}
}