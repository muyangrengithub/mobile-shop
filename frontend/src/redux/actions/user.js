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
  Shipping_Save,
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
} from '../constant.js'
import { register, login, getprofile, updateprofile,getUserList,deleteUser,getUser,updateUser} from "../../services/user"

//用户注册
export const userRegister = (name, email, password, shippingAddress) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const data = await register(name, email, password, shippingAddress)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


//用户登录
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const userInfo = await login(email, password)

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo })
    dispatch({type:Shipping_Save,payload:userInfo.shippingAddress})
    localStorage.setItem('userInfo', JSON.stringify(userInfo))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//用户登出
export const userLogout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}


//个人详情查询
export const userProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST })

    const userInfo = await getprofile()

    dispatch({ type: USER_PROFILE_SUCCESS, payload: userInfo })


  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//个人详情更新
export const userProfileUpdate = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST })
    const userInfo = await updateprofile(user)
    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo })
    dispatch({ type: USER_PROFILE_SUCCESS, payload: userInfo })
    dispatch({type:Shipping_Save,payload:userInfo.shippingAddress})
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//获取用户列表
export const userList = (pageNumber='',pageSize='') => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const users = await getUserList(pageNumber,pageSize)

    dispatch({ type: USER_LIST_SUCCESS, payload: users })


  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}  
//根据id删除用户
export const userDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    await deleteUser(id)

    dispatch({ type: USER_DELETE_SUCCESS})


  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
} 

//查询单个用户
export const userDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const userInfo = await getUser(id)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: userInfo })


  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//修改用户信息
export const userUpdate = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })
    const userInfo = await updateUser(user)
    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: userInfo })
  
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}