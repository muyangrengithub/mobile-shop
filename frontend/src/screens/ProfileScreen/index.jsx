import React,{useState,useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {Form,Button,Row,Col,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {USER_PROFILE_UPDATE_RESET} from '../../redux/constant'
import {orderListMy} from '../../redux/actions/order.js'
import {userProfile,userProfileUpdate} from '../../redux/actions/user.js'
const ProfileScreen = () => {
  const {loading,error,userInfo} = useSelector(state=>state.userProfile)
  const { loading: updateloading, error: updateerror,success } = useSelector(state=>state.userProfileUpdate)

  const { loading: loadingOrders, error: errorOrders, orders } = useSelector((state) => state.orderListMy)
 
  const dispatch = useDispatch()
  const [user,setUser] = useState({})
  const [message, setMessage] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [shippingAddress, setShippingAddress] = useState({})
  useEffect(()=>{
      if(orders && orders.length==0){
        dispatch(orderListMy())
      }
      if(!userInfo._id||success){
        dispatch({type:USER_PROFILE_UPDATE_RESET})
        dispatch(userProfile())
        
      
      }else{
        setUser(userInfo)
        setShippingAddress(userInfo.shippingAddress)
      }
      
     
  },[dispatch,userInfo,success])
 
 
   //表单提交函数
   const submitHandler = (e) => {
    e.preventDefault()
    //dispatch register函数
    if (user.password !== confirmPassword) {
      setMessage('密码不匹配')
    } else {
      setMessage('')
      dispatch(userProfileUpdate({...user,shippingAddress}))
    }
  }
  return(
    <Row>
      <Col md={3}>
        <h2>个人资料</h2>
        {/* {success && <Message variant='success'>更新成功！</Message>} */}
        {updateloading&&<Loader/>}
        {message && <Message variant='danger'>{message}</Message>}
        {updateerror&&<Message variant='danger'>{updateerror}</Message>}
        {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>姓名：</Form.Label>
            <Form.Control
              type='name'
              placeholder='请输入姓名'
              value={user.name}
              required
              onChange={(e) => setUser(state=>({...state,name:e.target.value}))}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>邮箱地址：</Form.Label>
            <Form.Control
              type='email'
              placeholder='请输入邮箱'
              value = {user.email}
              required
              onChange={(e) => setUser(state=>({...state,email:e.target.value}))}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>密码：</Form.Label>
            <Form.Control
              type='password'
              placeholder='请输入密码'
              value = {user.password}
              required
              onChange={(e) => setUser(state=>({...state,password:e.target.value}))}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>确认密码：</Form.Label>
            <Form.Control
              type='password'
              placeholder='请确认密码'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='province'>
          <Form.Label>所在省份：</Form.Label>
          <Form.Control
            type='province'
            placeholder='请输入所在省份'
            value={shippingAddress.province}
            required
            onChange={(e) => setShippingAddress(state=>({...state,province:e.target.value}))}
          ></Form.Control>
        </Form.Group>
       
        <Form.Group controlId='city'>
          <Form.Label>所在地区：</Form.Label>
          <Form.Control
            type='city'
            placeholder='请输入所在地区'
            value={shippingAddress.city}
            required
            onChange={(e) => setShippingAddress(state=>({...state,city:e.target.value}))}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label>详细地址：</Form.Label>
          <Form.Control
            type='address'
            placeholder='请输入详细地址'
            value={shippingAddress.address}
            required
            onChange={(e) => setShippingAddress(state=>({...state,address:e.target.value}))}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>邮政编码：</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='请输入邮政编码'
            value={shippingAddress.postalCode}
            required
            onChange={(e) => setShippingAddress(state=>({...state,postalCode:e.target.value}))}
          ></Form.Control>
        </Form.Group>
          <Button type='submit' variant='primary'>
            更改资料
          </Button>
        </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>我的订单</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>下单日期</th>
                <th>总价</th>
                <th>支付状态</th>
                <th>发货状态</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td style={{color:'green'}}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td style={{color:'green'}}>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        订单详情
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
};

export default ProfileScreen;
