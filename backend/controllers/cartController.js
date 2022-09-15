import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

//@desc    查询购物车
//@route   GET/api/cart
//@access  私密
export const getCart = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if (user) {
        let { cartItems } = await userModel.findById(user._id).populate({
            path: 'cartItems',
            populate: { path: 'product'}
        })
        cartItems= cartItems.filter(item=>item.product)
     
        res.json(cartItems)
    } else {
        res.status(404)
        throw new Error('用户不存在')
    }

})

//@desc    更新购物车
//@route   POST/api/cart
//@access  私密
export const updateCart = asyncHandler(async (req, res) => {
    const { id, qty } = req.body
    const product = await productModel.findById(id)
    const user = await userModel.findById(req.user._id)
   
    if (product) {
        //const user = await userModel.findById(req.userid);
        let cartItems = user.cartItems;

        const existItem = cartItems.find(x => x.product == id)

        if (existItem) {
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? { product: id, qty: qty } : x
            )
        } else {
            cartItems = [...cartItems, { product: id, qty: qty }]
        }
        user.cartItems = cartItems
        await user.save()
        res.json({ message: '更新成功' })
    } else {
        res.status(404)
        throw new Error('添加的商品不存在')
    }
})

//@desc    根据id删除购物车商品
//@route   DELETE/api/cart/:id
//@access  私密
export const deleteCart = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await productModel.findById(id)

    if (product) {
        const user = await userModel.findById(req.user._id);
        let cartItems = user.cartItems;

        const existItem = cartItems.find(x => x.product == id)

        if (existItem) {
            cartItems = cartItems.filter((x) =>
                x.product !== existItem.product
            )
        }
        user.cartItems = cartItems
        await user.save()
        res.json({ message: '删除成功' })
    } else {
        res.status(404)
        throw new Error('删除的商品不存在')
    }
})