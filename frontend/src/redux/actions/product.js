import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
} from '../constant.js'
import {getProducts,getProduct,deleteProduct,createProduct,updateProduct,createProductReview,getProductTop} from '../../services/products.js'


//获取所有产品列表
export const productList = (keyword = '', pageNumber = '',pageSize='')=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const data = await getProducts(keyword,pageNumber,pageSize)
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

//根据id获取产品详情
export const productDetails = (id)=>async(dispatch)=>{
  try {
      dispatch({type:PRODUCT_DETAILS_REQUEST})
      const data = await getProduct(id)
      dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
  } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

//根据id删除产品
export const productDelete = (id)=>async(dispatch)=>{
  try {
      dispatch({type:PRODUCT_DELETE_REQUEST})
      const data = await deleteProduct(id)
      dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data})
  } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

//创建产品
export const productCreate = (product)=>async(dispatch)=>{
  try {
      dispatch({type:PRODUCT_CREATE_REQUEST})
      const data = await createProduct(product)
      dispatch({type:PRODUCT_CREATE_SUCCESS})
  } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}


//更新产品
export const productUpdate = (product)=>async(dispatch)=>{
  try {
      dispatch({type:PRODUCT_UPDATE_REQUEST})
      const data = await updateProduct(product)
      dispatch({type:PRODUCT_UPDATE_SUCCESS})
      dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
 
  } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

//创建产品的评论
export const productReviewCreate = (productId, review)=>async(dispatch)=>{
  try {
      dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})
      await createProductReview(productId,review)
      dispatch({type:PRODUCT_CREATE_REVIEW_SUCCESS})
  } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}   

//获取排名前三的产品
export const productListTop = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })
    const  data  = await getProductTop()
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}