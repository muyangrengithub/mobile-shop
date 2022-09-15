import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'

export const protect = asyncHandler(async(req,res,next)=>{
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.id).select('-password') 
            next()
        } catch (error) {
            res.status(401)
            throw new Error('未授权，token验证失败')
        }
      
    }else{
        res.status(401)
        throw new Error('未授权，没有token')
    }
})

export const admin=asyncHandler(async(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('不是被授权的管理员')
    }
})