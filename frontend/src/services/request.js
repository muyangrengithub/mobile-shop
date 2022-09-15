import axios from "axios";
import store from "../redux/store"
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

//公开的请求
const instance = axios.create({

})

instance.interceptors.request.use(config=>{
    return config
})

instance.interceptors.response.use(
    response =>{
        return response.data
    },
    err=>{
        if (err && err.response) {
            switch (err.response.status) {
              case 400:
                console.log("请求错误");
                break;
              case 401:
                console.log("未授权访问");
                // window.__router__.push('/')
                document.location.href = '/login'
                break;
              default:
                console.log("其他错误信息");
            }
          }
          //throw err
           return Promise.reject(err);
    }
)


//私密的请求
const protectInstance = axios.create({

})

protectInstance.interceptors.request.use(config=>{
  const userInfo=store.getState().userLogin.userInfo
 
  if(!userInfo){
      document.location.href = '/login'
      // window.__router__.push("/login")
      return 
  }
  config.headers.Authorization = `Bearer `+userInfo.token
  
  return config
    // if(!config.headers.Authorization||!config.headers.Authorization.startWith('Bearer')){
      
    //   return 
    // }
 
})

protectInstance.interceptors.response.use(
 
    response =>{
     
        return response.data
    },
    err=>{
        if (err && err.response) {
            switch (err.response.status) {
              case 400:
                console.log("请求错误");
                break;
              case 401:
           
                console.log("未授权访问");
                localStorage.removeItem('userInfo')
                document.location.href = '/login'
                // window.__router__.push("/login")
                break;
              default:
                console.log("其他错误信息");
            }
          }
          //throw err
           return Promise.reject(err);
    }
)

export  {instance,protectInstance}