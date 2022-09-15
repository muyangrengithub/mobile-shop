import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {PRODUCT_UPDATE_RESET,PRODUCT_CREATE_RESET } from '../../redux/constant'
import { productDetails,productUpdate,productCreate} from '../../redux/actions/product.js'
import {uploadProductImage} from '../../services/products'
const ProductEditScreen = ({match,history}) => {
  const productId = match.params.id

  const { loading,error,product } = useSelector(state => state.productDetails)
  const { success:updatesuccess,loading: updateloading, error: updateerror } = useSelector(state => state.productUpdate)
  const { success:createsuccess,loading: createloading, error: createerror } = useSelector(state => state.productCreate)
  const dispatch = useDispatch()

  const [uploadLoading,setUploadLoading] = useState(false)
  const [uploadError,setUploadError] = useState('')
  const [productInfo, setProductInfo] = useState({
    name: '样品名称',
    price: 0,
    image: '/images/sample.jpg',
    brand: '样品品牌',
    category: '样品分类',
    countInStock: 0,
    numReviews: 0,
    description: '样品描述',
    rating: 0
  })

  useEffect(() => {
    if(productId){
        if (!product._id||product._id!==productId) {
            dispatch(productDetails(productId))
        } else {
            setProductInfo(product)
        }
    }
 
    if(updatesuccess||createsuccess){
       dispatch({type:PRODUCT_UPDATE_RESET})
       dispatch({type:PRODUCT_CREATE_RESET})
       history.go(-1)
    }

  }, [dispatch,product,updatesuccess,createsuccess])


  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    if(productId){
        dispatch(productUpdate(productInfo))
    }else{
        dispatch(productCreate(productInfo))
        
    }
   
  }
  //处理文件上传
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    
    const filtTypes = /jpg|jpeg|png|gif|webp|svg/
    const extname = filtTypes.test(file.name.split('.')[1])
    const type = filtTypes.test(file.type.split('/')[1])
    if(!extname||!type){
      setUploadError('仅限图片格式jpg、jpeg、png、gif、webp、svg')
      return
    }
    setUploadError('')
    const formData =  new FormData()
    formData.append('image',file)
    try{
      setUploadLoading(true)
      const path = await uploadProductImage(formData)
      setProductInfo(state => ({ ...state, image: path}))
      setUploadError('')
      setUploadLoading(false)
    }catch(error){
      setUploadError(error.response.data.message)
      setUploadLoading(false)
    }
  }
  return (
    <Row>
      <Col md={2}>
        <Button onClick={()=>{history.go(-1)}} className='btn btn-dark my-3' >
          返回上一页
        </Button>
      </Col>

      <Col md={10}>
      <FormContainer >

        {productId?<h1>编辑产品界面</h1>:<h1>创建产品界面</h1>}
        {updateerror && <Message variant='danger'>{updateerror}</Message>}
        {createerror && <Message variant='danger'>{createerror}</Message>}
        {loading || updateloading ||createloading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
           <Row>
           <Col md={6}>
            <Form.Group controlId='name'>
              <Form.Label>姓名：</Form.Label>
              <Form.Control
                type='name'
                placeholder='请输入产品名称'
                value={productInfo.name}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, name: e.target.value }))}
              ></Form.Control>
            </Form.Group>
           </Col>
           <Col md={6}>
            <Form.Group controlId='price'>
              <Form.Label>产品价格：</Form.Label>
              <Form.Control
                type='number'
                placeholder='请输入价格'
                value={productInfo.price}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, price: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
           <Col md={6}>
            <Form.Group controlId='image'>
              <Form.Label>图片：</Form.Label>
              <Form.Control
                type='text'
                placeholder='请输入图片路径'
                value={productInfo.image}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, image: e.target.value }))}
              ></Form.Control>
               <Form.File
                id='image-file'
                label='选择上传图片'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
               {uploadError && <Message variant='danger'>{uploadError}</Message>}
               {uploadLoading &&<Loader/>}
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='brand'>
              <Form.Label>品牌：</Form.Label>
              <Form.Control
                type='text'
                placeholder='请输入品牌'
                value={productInfo.brand}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, brand: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
           <Col md={6}>
            <Form.Group controlId='countInStock'>
              <Form.Label>产品库存：</Form.Label>
              <Form.Control
                type='number'
                placeholder='请输入库存数量'
                value={productInfo.countInStock}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, countInStock: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='category'>
              <Form.Label>产品类型：</Form.Label>
              <Form.Control
                type='text'
                placeholder='请输入产品类型'
                value={productInfo.category}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, category: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
           <Col md={6}>
            <Form.Group controlId='description'>
              <Form.Label>产品介绍：</Form.Label>
              <Form.Control
                type='text'
                placeholder='请输入产品介绍'
                value={productInfo.description}
                required
                onChange={(e) => setProductInfo(state => ({ ...state, description: e.target.value }))}
              ></Form.Control>
            </Form.Group>
            </Col>
        
          </Row>
        
       
            <Button type='submit' variant='primary' >
              更改信息
            </Button>
          </Form>

        )}
      </FormContainer>
      </Col></Row>
  )
};

export default ProductEditScreen;
