import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
} from '../constant.js'
//获取所有产品列表
export const productList = (state = { products: [] }, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: payload.products,
                pages: payload.pages,
                page: payload.page,
                pageSize:payload.pageSize
              }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}

//根据id获取产品详情
export const productDetails = (state = { product: {} }, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {  ...state,loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: payload }
        case PRODUCT_DETAILS_RESET:
            return {product:{}}
        default:
            return state
    }
}

//根据id删除产品
export const productDelete = (state = { product: {} }, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}

//创建商品
export const productCreate = (state = { product: {} }, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success:true }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: payload }
        case PRODUCT_CREATE_RESET:
            return {product: {} }
        default:
            return state
    }
}


//更新商品
export const productUpdate = (state = { product: {} }, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success:true }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: payload }
        case PRODUCT_UPDATE_RESET:
            return {product: {} }
        default:
            return state
    }
}

//创建产品的评论
export const productReviewCreate = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case PRODUCT_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case PRODUCT_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }

//获取排名前三的产品
export const productListTop = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_TOP_REQUEST:
        return { loading: true, products: [] }
      case PRODUCT_TOP_SUCCESS:
        return {
          loading: false,
          products: action.payload,
        }
      case PRODUCT_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  

  