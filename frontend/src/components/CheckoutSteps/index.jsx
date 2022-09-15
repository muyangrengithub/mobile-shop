import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3}) => {
  return (
    <Nav variant="pills" className='justify-content-center mb-4'>
     
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>收货地址</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>支付</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>支付</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>确认订单</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>确认订单</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
