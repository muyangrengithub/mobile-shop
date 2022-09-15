import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../../components/Product';
import { productList } from '../../redux/actions/product.js'
import Loader from '../../components/Loader'
import Message from '../../components/Message';
import ProductsCarousel from '../../components/ProductsCarousel'
const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(productList(keyword))
    }, [dispatch,keyword])
  
    const { loading, error, products } = useSelector(state => state.productList)
    return (<>
     <ProductsCarousel />
        <h1>最新产品</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Row >
                {
                    products.map((product) => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )
                    })
                }
            </Row>
        )}

    </>

    );
};

export default HomeScreen;
