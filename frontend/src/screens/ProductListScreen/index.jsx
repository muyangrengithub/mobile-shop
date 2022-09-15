import React, { useEffect,useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import MyModal from '../../components/MyModal'
import Paginate from '../../components/Paginate'
import {
    productList,productDelete
} from '../../redux/actions/product'

const ProductListScreen = ({ history, location }) => {
    const pageNumber = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const { loading, error, products, pages, page } = useSelector((state) => state.productList)
    const {loading:deleteloading,error:deleteerror,success} =useSelector((state) => state.productDelete)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [modal,setModal] = useState(false)
    const [deleteProductName,setDeleteProductName] = useState('')
    const [deleteProductId,setDeleteProductId] = useState('')
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(productList('',pageNumber,6))
        }
    }, [
        dispatch,success,pageNumber
    ])

    //删除产品函数
    const deleteHandler = (id,name) => {
        setDeleteProductId(id)
        setDeleteProductName(name)
        setModal(true)
    }
    //取消删除
    const handleClose = () => {
        setModal(false)

    }
    //确认删除
    const handleDone = () => {
        setModal(false)
        dispatch(productDelete(deleteProductId))
    }

    //创建产品
    const createProductHandler = () => {
        history.push("/admin/product")

    }
    return (
        <>
            <Row>
                <Col>
                    {' '}
                    <h1>产品列表</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        创建产品
                    </Button>
                </Col>
            </Row>
            {deleteerror&&<Message variant='danger'>{deleteerror}</Message>}
            {loading||deleteloading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>产品名称</th>
                                <th>价格</th>
                                <th>类型</th>
                                <th>品牌</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id,product.name)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} url='/admin/productlist' />
                    {modal&&<MyModal title='删除产品'
                    body={`确认删除产品${deleteProductName}？`} 
                    handleClose={handleClose}
                    handleDone={handleDone}/>}
                </>
            )}
        </>
    )
}

export default ProductListScreen
