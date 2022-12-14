import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { userRegister } from '../../redux/actions/user'
import FormContainer from '../../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shippingAddress, setShippingAddress] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  
  const { loading, error, userInfo }= useSelector((state) => state.userRegister)
  
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch register函数
    if (password !== confirmPassword) {
      setMessage('密码不匹配')
    } else {
      dispatch(userRegister(name, email, password,shippingAddress))
    }
  }
  return (
    <FormContainer>
      <h1>注册</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>姓名：</Form.Label>
          <Form.Control
            type='name'
            placeholder='请输入姓名'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>邮箱地址：</Form.Label>
          <Form.Control
            type='email'
            placeholder='请输入邮箱'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>密码：</Form.Label>
          <Form.Control
            type='password'
            placeholder='请输入密码'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
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
          注册
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          已有账户？
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            去登录
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
