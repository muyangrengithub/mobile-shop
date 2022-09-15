import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
} from '../constant.js'

//用户注册
export const userRegister = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }



const userInfo =  localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

//用户登录
export const userLogin = (state = {userInfo}, action) => {
    
    const { type, payload } = action
    switch (type) {
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: payload }
        case USER_LOGOUT:
           
            return {}
        default:
            return state
    }
}


//用户详情
export const userProfile = (state = {userInfo:{}}, action) => {
    
  const { type, payload } = action
  switch (type) {
      case USER_PROFILE_REQUEST:
          return { loading: true,...state}
      case USER_PROFILE_SUCCESS:
          return { loading: false, userInfo: payload }
      case USER_PROFILE_FAIL:
          return { loading: false, error: payload }
      default:
          return state
  }
}

//用户详情更新
export const userProfileUpdate =(state = {userInfo:{}}, action)=>{
   const {type,payload} = action
   switch(type){
      case USER_PROFILE_UPDATE_REQUEST:
        return { loading:true,...state}
      case USER_PROFILE_UPDATE_SUCCESS:
         return {loading:false,success:true}
      case USER_PROFILE_UPDATE_FAIL:
         return {loading:false,error:payload}
      case   USER_PROFILE_UPDATE_RESET:
        return {userInfo:{}}
      default:
         return state
   }
}

//获取用户列表
export const userList = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false,
         users: action.payload.users,
        pages: action.payload.pages,
        page: action.payload.page,
        pageSize:action.payload.pageSize  }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//删除单个用户
export const userDelete = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//查询单个用户
export const userDetails = (state = {userInfo:{}}, action) => {
    
  const { type, payload } = action
  switch (type) {
      case USER_DETAILS_REQUEST:
          return {...state, loading: true}
      case USER_DETAILS_SUCCESS:
          return { loading: false, userInfo: payload }
      case USER_DETAILS_FAIL:
          return { loading: false, error: payload }
      default:
          return state
  }
}

//更新用户
export const userUpdate =(state = {userInfo:{}}, action)=>{
  const {type,payload} = action
  switch(type){
     case USER_UPDATE_REQUEST:
       return { loading:true,...state}
     case USER_UPDATE_SUCCESS:
        return {loading:false,success:true}
     case USER_UPDATE_FAIL:
        return {loading:false,error:payload}
     case USER_UPDATE_RESET:
        return {userInfo:{}}
     default:
        return state
  }
}   