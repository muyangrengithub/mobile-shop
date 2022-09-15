import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { cartList, cartUpdate,cartDelete } from '../../redux/actions/cart.js'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const CartScreen = ({ match, location,history}) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const { message: updateSuccess, error: updateError, loading: updateLoading } = useSelector(state => state.cartUpdate)
  const { cartItems, error: listError, loading: listLoading } = useSelector(state => state.cartList)
  const { message: deleteSuccess, error: deleteError, loading: deleteLoading } = useSelector(state => state.cartDelete)
  useEffect(() => {
   
    if (productId) {
      dispatch(cartUpdate({ id: productId, qty: qty }))
    } else {
      dispatch(cartList())
     
    }
  }, [dispatch, productId, qty])
  useEffect(() => {


    if (updateSuccess||deleteSuccess) {

      dispatch(cartList())

      dispatch({ type: 'Cart_UPDATE_RESET' })
      dispatch({ type: 'Cart_DELETE_RESET' })
    }


  }, [dispatch, updateSuccess, deleteSuccess])
  return (
    <Row>
      
      <Col md={8}>
        {/* {updateLoading?<Loader/>:updateError ? <Message variant='danger'>{updateError}</Message> : <></>} */}
        {updateError ? <Message variant='danger'>{updateError}</Message> : <></>}
        {deleteLoading?<Loader/>:deleteError ? <Message variant='danger'>{deleteError}</Message> : <></>}
        {listLoading||updateLoading ? <Loader />:listError ? <Message variant='danger'>{listError}</Message> :
          !listLoading && cartItems.length === 0 ? (<Message>
            购物车为空<Link to='/'>返回主页</Link>
          </Message>) : (
            <ListGroup variant='flush'>
              {
                cartItems.map(item => (
               
                  <ListGroup.Item key={item.product._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.product.image} alt={item.product.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${item.product._id}`}>{item.product.name}</Link>
                      </Col>
                      <Col md={2}>￥{item.product.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={e => dispatch(cartUpdate({ id: item.product._id, qty: Number(e.target.value) }))}
                        >
                          {
                            Array(item.product.countInStock).fill('').map((item, key) => {
                              return <option key={key + 1} value={key + 1}>{key + 1}</option>
                            })
                          }
                        </Form.Control>
                      </Col>
                      <Col md={3}>
                        <Button
                          type='button'
                          onClick={() => dispatch(cartDelete(item.product._id))}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          )

        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                共计({ cartItems.reduce((acc,item)=>acc+item.qty,0)})个产品
              </h2>
               ¥{cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                onClick={()=>history.push('/shipping')}
              >
                去支付
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
