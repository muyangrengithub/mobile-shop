import React, { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import {
  Form,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
  Card,
  Modal,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {getOrderDetails,orderPay,orderDeliver} from '../../redux/actions/order.js'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET,ORDER_LIST_MY_RESET} from '../../redux/constant'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import './index.css'


const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const isAdmin = match.params.isAdmin
  const dispatch = useDispatch()
  //弹出框的状态
  const [show, setShow] = useState(false)
  //支付提示
  const [text,setText] = useState('请扫码')
  const { order, loading, error } = useSelector((state) => state.orderDetails)
  const { userInfo }  = useSelector((state) => state.userLogin)
  const  { loading: loadingPay, error: errorPay, success: successPay } = useSelector((state) => state.orderPay)
  const { loading: loadingDeliver,error: errorDeliver, success: successDeliver }  = useSelector((state) => state.orderDeliver)
 
  //计算价格
  // if (!loading) {
  //   const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2)
  //   }
  //   order.itemsPrice = addDecimals(
  //     order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //   )
  // }
  useEffect(() => {
   
    if (!order || order._id !== orderId || successPay||successDeliver ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({type:ORDER_LIST_MY_RESET})
      dispatch(getOrderDetails(orderId))
     
    }
    if(successPay){
      setText('您已经支付成功，请等待发货')
    }

    // eslint-disable-next-line
  }, [dispatch, history,order,orderId,successPay,successDeliver])

 //模拟weixin支付成功回调函数
 const handlePayment=()=>{
    setShow(true)
    setTimeout(()=>{
      dispatch(orderPay(orderId))
    },3000)
 }

 //paypal订单
 const createOrder=(data, actions) => {
  return actions.order.create({
      purchase_units: [
          {
              amount: {
                  value: order.itemsPrice,
                  currency: "CNY",
              },
          },
      ],
  });
}
  //paypal支付成功回调函数
  const successPaymentHandler = (paymentResult) => {

    dispatch(orderPay(orderId))
   
  }

  
  //创建点击发货btn的函数
  const deliverHandler = () => {
    dispatch(orderDeliver(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div className='orderScreen'>
      <h1>订单号：{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>收货地址</h2>
            
              <p>
                <strong>姓名:</strong>
                {order.user.name}
              </p>
              <p>
                {' '}
                <strong>邮箱:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
              <strong>收件人地址：</strong>
                {order.shippingAddress.province},{order.shippingAddress.city},
                {order.shippingAddress.address},
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  发货时间：{order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>未发货</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <p>
                <strong>支付方法：</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>支付时间：{order.paidAt}</Message>
              ) : (
                <Message variant='danger'>待支付</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {order.orderItems.length === 0 ? (
                <Message>购物车为空</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>订单详情</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>产品总价</Col>
                  <Col>￥{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>运费</Col>
                  <Col>￥{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>订单总价</Col>
                  <Col>￥{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
             {/* PayPal支付BTN */}
             {isAdmin!=='admin'&&!order.isPaid && order.paymentMethod === 'PayPal' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {(
                  <PayPalScriptProvider deferLoading={false} options={{ "client-id": "ASuztrrACVXHxVZhn7-svGXi3aLLryu5NatbpQGiOQO7qhSYM31F-pmknq7j1HIUuau7AxrUrXIv8H3T" }}>
                    <PayPalButtons
                      createOrder={createOrder}
                  
                      onApprove={successPaymentHandler}
                      onCancel={console.log('取消支付')}
                      onError={console.log('支付失败')}
                    />
                  </PayPalScriptProvider>
                  )}
                </ListGroup.Item>
              )}
            {isAdmin!=='admin'&&!order.isPaid && order.paymentMethod === 'weixin' && (
                <ListGroup.Item>
                  {/* 微信支付BTN */}
                  
                  <Button
                    type='button'
                    className='btn-block'
                    onClick={handlePayment}
                    disabled={order.orderItems === 0}
                  >
                    去支付
                  </Button>
                  <Modal show={show} onHide={()=>setShow(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>订单号：{order._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>支付金额： ¥{order.totalPrice}</p>
                      <p>支付方式： {order.paymentMethod}</p>
                      {errorPay&&<Message variant='danger'>{errorPay}</Message>}
                      {loadingPay|| <Row>
                        <Col className='colcenter' md={6} >
                          <Image src='/images/wechat.png' />
                          <p>{text}</p>
                        </Col>
                        <Col>
                          <Image src='/images/saoyisao.jpg' />
                        </Col>
                      </Row>}
                     
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant='primary' onClick={()=>setShow(false)}>
                        关闭
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </ListGroup.Item>
              )}
               {/* 发货BTN */}
               {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                     {loadingDeliver && <Loader />}
                    {errorDeliver&&<Message variant='danger'>{errorDeliver}</Message>}
                    <Button
                      type='button'
                      className='btn-block'
                      onClick={deliverHandler}
                    >
                      发货
                    </Button>
                  </ListGroup.Item>
                )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
