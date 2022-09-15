import React,{memo,useState,useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Button, ListGroup, Card,Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import {productDetails,productReviewCreate} from '../../redux/actions/product.js'
import {PRODUCT_CREATE_REVIEW_RESET,PRODUCT_DETAILS_RESET} from '../../redux/constant'
import Loader from '../../components/Loader'
import Message from '../../components/Message';
const ProductScreen = ({ history,match }) => {
  window.__router__=history

  const dispatch = useDispatch()
  const [qty,setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

 
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, product } = useSelector(state => state.productDetails)
  const {loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = useSelector((state) => state.productReviewCreate)

   useEffect(() => {

    // dispatch(productDetails(match.params.id))

    if (successProductReview||errorProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    if (
      !product._id ||
      product._id !== match.params.id ||
      successProductReview
    ) {
      dispatch({ type: PRODUCT_DETAILS_RESET })
      dispatch(productDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    // eslint-disable-next-line
  }, [dispatch, match, successProductReview,errorProductReview])


  //添加到购物车事件
  const addToCartHandler = ()=>{
     history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

    //提交评论内容的函数
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(productReviewCreate(match.params.id, { rating, comment }))
    }
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>返回主页</Link>
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
        <>
         <Row>
         <Col md={6}>
           <Image src={product.image} alt={product.name} fluid />
         </Col>
         <Col md={3}>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
               <Rating
                 value={product.rating}
                 text={`${product.numReviews}条评论`}
                 color='orange'
               />
             </ListGroup.Item>
             <ListGroup.Item>价格：¥{product.price}</ListGroup.Item>
             <ListGroup.Item>描述：¥{product.description}</ListGroup.Item>
           </ListGroup>
         </Col>
         <Col md={3}>
           <Card>
           <ListGroup variant="flush">
             <ListGroup.Item>
                 <Row>
                   <Col>价格：</Col>
                   <Col>￥{product.price}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                  <Row>
                   <Col>库存：</Col>
                   <Col>{product.countInStock>0?'有货':'没货'}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                  <Row>
                   <Col>数量</Col>
                   <Col>
                   <Form.Control
                          as='select'
                          value={qty}
                          onChange={e=>setQty(e.target.value)}
                        >
                          {
                             Array(product.countInStock).fill('').map((item,key)=>{
                               return <option key={key+1} value={key+1}>{key+1}</option>
                             })
                          }
                        </Form.Control>
                   </Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                   <Button className='btn-block' type='button' onClick={addToCartHandler} disabled={product.countInStock===0}>添加到购物车</Button>
             </ListGroup.Item>
            
           </ListGroup>
           </Card>
         </Col>
       </Row>
          {/* 评价区域 */}
          <Row>
            <Col md={6}>
              <h2>评论</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>没有评论</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                 <ListGroup.Item>
                  <h2>创建评论</h2>
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>评分：</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>选择评分...</option>
                          <option value='1'>1 - 非常不满意</option>
                          <option value='2'>2 - 不满意</option>
                          <option value='3'>3 - 一般</option>
                          <option value='4'>4 - 满意</option>
                          <option value='5'>5 - 非常满意</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          required
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        提交评论
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      请<Link to='/login'> 登录</Link>后再添加评论?
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
            <ListGroup variant='flush'>
          
                </ListGroup>
            </Col>
          </Row>
          </>
      )}
     
    </>


  )
};

export default memo(ProductScreen);
