import React from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { userLogout } from '../../redux/actions/user.js'
import SearchBox from '../../components/SearchBox'
const Header = () => {

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)
    //退出登录
    const logoutHandler = () => {
        dispatch(userLogout())
    }
    return (
        <header>
            <Navbar collapseOnSelect bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href="#home">牧羊商城</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link >  <i className='fas fa-shopping-cart'></i>购物车</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>个人详情</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        退出
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ) : (<LinkContainer to='/login'>
                                <Nav.Link > <i className='fas fa-user'></i>登录 </Nav.Link>
                            </LinkContainer>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='管理员模块' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>用户列表</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>产品列表</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>订单列表</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header
