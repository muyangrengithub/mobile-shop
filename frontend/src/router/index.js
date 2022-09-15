import { Redirect } from "react-router-dom";
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen"
import PlaceorderScreen from "../screens/PlaceorderScreen"
import OrderScreen from "../screens/OrderScreen"
import UserListScreen from "../screens/UserListScreen"
import UserEditScreen from "../screens/UserEditScreen"
import ProductListScreen from "../screens/ProductListScreen"
import ProductEditScreen from "../screens/ProductEditScreen"
import OrderListScreen from "../screens/OrderListScreen"
const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/products"/>
    )
  },
  {
    path: "/products",
    exact: true,
    component: HomeScreen,
  },
  {
    path: "/search/:keyword",
    component: HomeScreen,
  },
  {
    path: "/products/:id",
    component: ProductScreen
  },
  {
    path: "/cart/:id?",
    component: CartScreen
  },
  {
    path: "/login",
    component: LoginScreen
  },
  {
    path: "/register",
    component: RegisterScreen
  },
  {
    path: "/profile",
    component: ProfileScreen
  },
  {
    path: "/shipping",
    component: ShippingScreen
  },
  {
    path: "/payment",
    component: PaymentScreen
  },
  {
    path: "/placeorder",
    component: PlaceorderScreen
  },
  {
    path:"/order/:id/:isAdmin?",
    component:OrderScreen
  },
  {
    path:"/admin/userlist",
    component:UserListScreen
  },
  {
    path:"/admin/user/:id/edit",
    component:UserEditScreen
  },
  {
    path:"/admin/productlist",
    component:ProductListScreen
  },
  {
    path:"/admin/product/:id?",
    component:ProductEditScreen
  },
  {
    path:"/admin/orderlist",
    component:OrderListScreen
  }
];

export default routes;
