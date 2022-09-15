import {combineReducers} from 'redux'
import {productList,productDetails,productDelete,productCreate,productUpdate,productReviewCreate,productListTop} from './product.js'
import {cartList,cartUpdate,cartDelete,shippingInfo} from './cart.js'
import {userRegister,userLogin,userProfile,userProfileUpdate,userList,userDelete,userDetails,userUpdate} from './user'
import {orderCreate,orderDetails,orderList,orderPay,orderDeliver,orderListMy} from './order.js'
export default combineReducers({
	productList,
	productDetails,
	productDelete,
	productCreate,
	productUpdate,
	productReviewCreate,
	productListTop,
	cartList,
	cartUpdate,
	cartDelete,
	shippingInfo,
	userLogin,
	userRegister,
	userProfile,
	userList,
	userDelete,
	userDetails,
	userUpdate,
	userProfileUpdate,
	orderCreate,
	orderDetails,
	orderList,
	orderPay,
	orderDeliver,
	orderListMy
})
