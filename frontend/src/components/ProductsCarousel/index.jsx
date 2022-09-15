import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import { productListTop } from '../../redux/actions/product'
import './index.css'

const ProductsCarousel = () => {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector((state) => state.productListTop)
  

  useEffect(() => {
    dispatch(productListTop())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='productsCarousel bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h4>
                {product.name} (¥{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductsCarousel
