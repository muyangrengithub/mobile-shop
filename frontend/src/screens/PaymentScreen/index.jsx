import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { paymentMethodSave } from '../../redux/actions/cart'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'

const PaymenScreen = ({ history }) => {
  const dispatch = useDispatch()
  const {shippingAdress,paymentMethod} = useSelector(state=>state.shippingInfo)
  if(!shippingAdress){
      history.push('/shipping')
  }
  const [payment,setPayment] = useState(paymentMethod)
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(paymentMethodSave(payment))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>支付方式</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>选择支付方式</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='微信'
              id='weixin'
              name='paymenMethod'
              value='weixin'
              checked={payment==='weixin'}
              onChange={e=>setPayment(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='paymenMethod'
              value='PayPal'
              checked={payment==='PayPal'}
              onChange={e=>setPayment(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          继续下一步
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymenScreen
