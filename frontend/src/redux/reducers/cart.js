import {
    Cart_LIST_REQUEST,
    Cart_LIST_SUCCESS,
    Cart_LIST_FAIL,
    Cart_LIST_RESET,
    Cart_UPDATE_REQUEST,
    Cart_UPDATE_SUCCESS,
    Cart_UPDATE_FAIL,
    Cart_UPDATE_RESET,
    Cart_DELETE_REQUEST,
    Cart_DELETE_SUCCESS,
    Cart_DELETE_FAIL,
    Cart_DELETE_RESET,
    Shipping_Save,
    PaymentMethod_Save
} from '../constant.js'

//查询购物车
export const cartList = (state = { cartItems: [] }, action) => {
    const { type, payload } = action
    switch (type) {
        case Cart_LIST_REQUEST:
            return { loading: true, cartItems: [] }
        case Cart_LIST_SUCCESS:
            return { loading: false, cartItems: payload }
        case Cart_LIST_FAIL:
          
            return { loading: false, error: payload }
        case Cart_LIST_RESET:
            return {cartItems: []}
        default:
            return state
    }
}

//更新购物车
export const cartUpdate = (state = {}, action) => {
    const { type, payload } = action
    switch (type) {
        case Cart_UPDATE_REQUEST:
            return { loading: true }
        case Cart_UPDATE_SUCCESS:
            return { loading: false, message: payload }
        case Cart_UPDATE_FAIL:
            return { loading: false, error: payload }
        case Cart_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

//根据id删除购物车商品
export const cartDelete = (state = {}, action) => {
    const { type, payload } = action
    switch (type) {
        case Cart_DELETE_REQUEST:
            return { loading: true }
        case Cart_DELETE_SUCCESS:
           
            return { loading: false, message: payload }
        case Cart_DELETE_FAIL:
          
            return { loading: false, error: payload }
        case Cart_DELETE_RESET:
            return {}
        default:
            return state
    }
}


//购物地址以及支付方式存储
let shippingAdress
if(localStorage.getItem('shippingAdress')){
    shippingAdress = JSON.parse(localStorage.getItem('shippingAdress'))
}else if(localStorage.getItem('userInfo')){
    shippingAdress =JSON.parse(localStorage.getItem('userInfo')).shippingAddress
}else{
    {}
}
 //const shippingAdress=JSON.parse(localStorage.getItem('shippingAdress'))||JSON.parse(localStorage.getItem('userInfo')).shippingAddress
const paymentMethod = localStorage.getItem('paymentMethod')||'weixin'
export const shippingInfo = (state={shippingAdress,paymentMethod},action)=>{
    const {type,payload} = action

    switch(type){
        case Shipping_Save:
            return {...state,shippingAdress:payload}
        case PaymentMethod_Save:
            return {...state,paymentMethod:payload}
        default:
            return state
    }
}
