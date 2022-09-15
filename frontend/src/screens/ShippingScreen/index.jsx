import React, { useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import {shippingSave} from '../../redux/actions/cart'

const ShippingScreen = ({history}) => {

    const shipping = useSelector(state=>state.shippingInfo.shippingAdress)
    const [shippingAddress,setShippingAddress] = useState(shipping)
    const dispatch = useDispatch()
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(shippingSave(shippingAddress))
        history.push('/payment')
    }
    return (
        <FormContainer>
             <CheckoutSteps step1/>
            <h1>收货地址</h1>
           
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='province'>
                    <Form.Label>所在省份：</Form.Label>
                    <Form.Control
                        type='province'
                        placeholder='请输入所在省份'
                        value={shippingAddress.province}
                        onChange={(e) => setShippingAddress(state => ({ ...state, province: e.target.value }))}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>所在地区：</Form.Label>
                    <Form.Control
                        type='city'
                        placeholder='请输入所在地区'
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(state => ({ ...state, city: e.target.value }))}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>详细地址：</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='请输入详细地址'
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress(state => ({ ...state, address: e.target.value }))}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>邮政编码：</Form.Label>
                    <Form.Control
                        type='postalCode'
                        placeholder='请输入邮政编码'
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress(state => ({ ...state, postalCode: e.target.value }))}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    继续下一步
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen