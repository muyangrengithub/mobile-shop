import React, { useEffect,useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import MyModal from '../../components/MyModal'
import Paginate from '../../components/Paginate'
import { userList,userDelete } from '../../redux/actions/user'
import './index.css'

const UserListScreen = ({ history,location }) => {
  const pageNumber = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const [modal,setModal] = useState(false)
  const [deleteUserName,setDeleteUserName] = useState('')
  const [deleteUserId,setDeleteUserId] = useState('')
  const { loading, error, users, pages, page  } = useSelector((state) => state.userList)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const {loading:loadingdelete,error:deleteerror,success} = useSelector(state=>state.userDelete)
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userList(pageNumber,6))
    }
  }, [dispatch, history, userInfo,success,pageNumber])

  //删除用户函数
  const deleteHandler = (id,name) => {
    setDeleteUserId(id)
    setDeleteUserName(name)
    setModal(true)
  
  }

  //取消删除
  const handleClose=()=>{
    setModal(false)
   
  }
  //确认删除
  const handleDone=()=>{
    setModal(false)
    dispatch(userDelete(deleteUserId))
  }
  
  return (
    <div className='userList'>
      <h1>用户列表</h1>
      {deleteerror&&<Message variant='danger'>{deleteerror}</Message>}
      {loading||loadingdelete ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <><Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>管理员</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' ></i>
                  ) : (
                    <i className='fas fa-times' ></i>
                  )}
                </td>
                <td>
                 {user._id===userInfo._id||
                <>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(user._id,user.name)}
                >
                  <i className='fas fa-trash'></i>
                </Button></>
               
               }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} url='/admin/userlist' />
          {modal&&<MyModal title='删除用户'
           body={`确认删除用户${deleteUserName}？`} 
           handleClose={handleClose}
           handleDone={handleDone}/>}
        </>
      )}
    </div>
  )
}

export default UserListScreen
