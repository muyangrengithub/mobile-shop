import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc    注册新用户
//@route   POST/api/user
//@access  公开
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, shippingAddress } = req.body
    const userExist = await userModel.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('用户已存在')
    }
    const user =await userModel.create({ name, email, password, shippingAddress })
    if (user) {
       
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            shippingAddress: user.shippingAddress,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('无效的用户信息')
    }


})

//@desc    用户登录验证 && 获取token
//@route   POST/api/user/login
//@access  公开
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            shippingAddress: user.shippingAddress,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('邮箱或者密码无效')
    }
})

//@desc    用户详情
//@route   GET/api/user/profile
//@access  私密
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)
    console.log(user)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            shippingAddress: user.shippingAddress,
        })
    } else {
        res.status(404)
        throw new Error('用户不存在')
    }
})

//@desc    更新用户详情
//@route   PUT/api/user/profile
//@access  私密
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress
        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            shippingAddress: updateUser.shippingAddress,
            token: generateToken(updateUser._id),
        })
    } else {
        res.status(404)
        throw new Error('用户不存在')
    }
})

//@desc    获取所有用户
//@route   GET/api/user/
//@access  私密（仅限管理员）
export const getUsers = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 6
    const page = Number(req.query.pageNumber) || 1
  
    const count = await userModel.countDocuments()
    const users = await userModel.find({}).sort({isAdmin:-1})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    res.json({ users, page, pageSize, pages: Math.ceil(count / pageSize) })

})

//@desc    根据id删除指定用户
//@route   DELETE/api/user/:id
//@access  私密（仅限管理员）
export const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    const user = await userModel.findById(id)

    if(user){
        await user.remove()
        res.json({ message: '用户已删除' })
    }else{
        res.status(404)
        throw new Error('查找不到该用户')
    }
   
})

//@desc    获取单个用户
//@route   GET/api/user/:id
//@access  私密（仅限管理员）
export const getUserById = asyncHandler(async (req, res) => {
    const {id} = req.params
    const user = await userModel.findById(id).select({password:0})

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('查找不到该用户')
    }
})

//@desc    更新单个用户
//@route   PUT/api/user/:id
//@access  私密
export const updateUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id)
    if (user) {
        await userModel.updateOne({_id:req.params.id},req.body)
        const updateuser = await userModel.findById(req.params.id)
        res.json(updateuser)
    } else {
        res.status(404)
        throw new Error('用户不存在')
    }
})