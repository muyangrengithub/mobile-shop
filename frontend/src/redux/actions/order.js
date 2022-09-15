import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_RESET
} from '../constant'

import {createOrder,getOrderById,getOrders,updateOrderToPaid,getMyOrders,updateOrderToDelivered} from '../../services/order.js'


//创建订单
export const orderCreate = (order)=>async(dispatch)=>{
    try {
        dispatch({type:ORDER_CREATE_REQUEST})
        const data = await createOrder(order)
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data})
    } catch (error) {  
        dispatch({
          type: ORDER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
}

//获取单个订单
export const getOrderDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})
        const data = await getOrderById(id)
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})
    } catch (error) {  
        dispatch({
          type: ORDER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
}

//获取所有订单
export const orderList = (pageNumber='',pageSize='') => async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST })
      const data = await getOrders(pageNumber,pageSize)
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

//支付成功后修改订单支付状态
export const orderPay = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })
    await updateOrderToPaid(id)
    dispatch({ type: ORDER_PAY_SUCCESS })
    dispatch({type:ORDER_LIST_MY_RESET})
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}  


//修改订单发货状态
export const orderDeliver = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST })
    await updateOrderToDelivered(id)
    dispatch({ type: ORDER_DELIVER_SUCCESS })
    dispatch({type:ORDER_LIST_MY_RESET})
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
} 

//获取登录用户订单
export const orderListMy = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST })
    const data = await getMyOrders()
    dispatch({ type: ORDER_LIST_MY_SUCCESS,payload:data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
} 