import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {USER_UPDATE_RESET} from '../../redux/constant'
import { userDetails,userUpdate } from '../../redux/actions/user.js'
const UserEditScreen = ({match,history}) => {
  const userId = match.params.id
  const { loading, error, userInfo } = useSelector(state => state.userDetails)
  const { success,loading: updateloading, error: updateerror } = useSelector(state => state.userUpdate)
  
  const dispatch = useDispatch()
  const [user, setUser] = useState({})

  const [shippingAddress, setShippingAddress] = useState({})
  useEffect(() => {
   
    if (!userInfo._id||userInfo._id!==userId) {
      dispatch(userDetails(userId))
    } else {
      setUser(userInfo)
      setShippingAddress(userInfo.shippingAddress)
    }

    if(success){
       dispatch({type:USER_UPDATE_RESET})
       history.go(-1)
    }

  }, [dispatch, userInfo,success])


  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdate({ _id:userId,...user, shippingAddress }))
  }
  return (
    <Row>
      <Col md={2}>
        <Link to='/admin/userlist' className='btn btn-dark my-3' >
          返回上一页
        </Link>
      </Col>

      <Col md={10}>
      <FormContainer >

        <h1>编辑用户界面</h1>
        {updateerror && <Message variant='danger'>{updateerror}</Message>}
        {loading || updateloading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
           <Row>
           <Col md={6}>
            <Form.Group controlId='name'>
              <Form.Label>姓名：</Form.Label>
              <Form.Control
                type='name'
                placeholder='请输入姓名'
                value={user.name}
                required
                onChange={(e) => setUser(state => ({ ...state, name: e.target.value }))}
              ></Form.Control>
            </Form.Group>
           </Col>
           <Col md={6}>
            <Form.Group controlId='email'>
              <Form.Label>邮箱地址：</Form.Label>
              <Form.Control
                type='email'
                placeholder='请输入邮箱'
                value={user.email}
                required
                onChange={(e) => setUser(state => ({ ...state, email: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
           <Col md={6}>
            <Form.Group controlId='province'>
              <Form.Label>所在省份：</Form.Label>
              <Form.Control
                type='province'
                placeholder='请输入所在省份'
                value={shippingAddress.province}
                required
                onChange={(e) => setShippingAddress(state => ({ ...state, province: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='city'>
              <Form.Label>所在地区：</Form.Label>
              <Form.Control
                type='city'
                placeholder='请输入所在地区'
                value={shippingAddress.city}
                required
                onChange={(e) => setShippingAddress(state => ({ ...state, city: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
           <Col md={6}>
            <Form.Group controlId='address'>
              <Form.Label>详细地址：</Form.Label>
              <Form.Control
                type='address'
                placeholder='请输入详细地址'
                value={shippingAddress.address}
                required
                onChange={(e) => setShippingAddress(state => ({ ...state, address: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='postalCode'>
              <Form.Label>邮政编码：</Form.Label>
              <Form.Control
                type='postalCode'
                placeholder='请输入邮政编码'
                value={shippingAddress.postalCode}
                required
                onChange={(e) => setShippingAddress(state => ({ ...state, postalCode: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
          </Row>
    
          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={user.isAdmin}
              onChange={(e) => setUser(state => ({ ...state, isAdmin: e.target.checked }))}
            ></Form.Check>
          </Form.Group>
       
            <Button type='submit' variant='primary' >
              更改信息
            </Button>
          </Form>

        )}
      </FormContainer>
      </Col></Row>
  )
};

export default UserEditScreen;
