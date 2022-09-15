import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, ListGroup, Row, Col, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import CheckoutSteps from '../../components/CheckoutSteps'
import { cartList} from '../../redux/actions/cart.js'
import {orderCreate} from '../../redux/actions/order.js'
import {ORDER_CREATE_RESET,ORDER_LIST_MY_RESET} from '../../redux/constant.js'

const PlaceorderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state=>state.cartList)
  const {shippingAdress,paymentMethod} = useSelector(state=>state.shippingInfo)

  const { order, success, error } = useSelector((state) => state.orderCreate) 
  //计算价格
  const datafixed=(num)=>{
      return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice =cart.cartItems.reduce((pre,item)=>{
    return pre + item.qty*item.product.price
  },0)
  cart.shippingPrice = cart.itemsPrice>=100?0:20
  cart.totalPrice=cart.itemsPrice+cart.shippingPrice
  useEffect(()=>{
     if (!cart.cartItems.length) {
        dispatch(cartList())
     }
     if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch({type:ORDER_LIST_MY_RESET})
    }
  },[history, success])
  //处理订单数据
  const getOrderData = () =>{
   const orderItems= cart.cartItems.map((item)=>{
          return {
            qty:item.qty,
            name:item.product.name,
            image:item.product.image,
            price:item.product.price,
            product:item.product._id
          }
    })
    return {
      orderItems,
      shippingAddress:shippingAdress,
      paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice
    }
  } 
  //提交订单函数
  const placeorderHandler = () => {
      dispatch(orderCreate(getOrderData()))
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3  />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>收货地址</h2>
              <p>
                <strong>收件人地址：</strong>
                {shippingAdress.province},{shippingAdress.city},
                {shippingAdress.address},{shippingAdress.postalCode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <strong>支付方法：{paymentMethod==='weixin'?`微信`:`PayPal`}</strong>
             
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {cart.cartItems.length === 0 ? (
                <Message>购物车为空</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product._id}`}>
                            {item.product.name}   
                          </Link>
                        </Col>
                        <Col md={4}>
                            {item.qty} x {item.product.price} = {item.qty*item.product.price}
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
                  <Col>￥{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>运费</Col>
                  <Col>￥{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>订单总价</Col>
                  <Col>￥{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={placeorderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  提交订单
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceorderScreen
