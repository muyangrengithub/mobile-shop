import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'


//@desc    创建订单
//@route   POST/api/orders
//@access  私密
export const addOrderItems = asyncHandler(async (req, res) => {
  const orderinfo = req.body

  if (orderinfo.orderItems && orderinfo.orderItems.length === 0) {
    res.status(400)
    throw new Error('没有订单信息')
  } else {

    const order = new Order({
      user: req.user._id,
      ...orderinfo
    })

    const createOrder = await order.save()

    //删除购物车
    const user = await User.findById(req.user._id)
    user.cartItems = []
    await user.save()

    res.status(201).json(createOrder)

  }
})

//@desc    根据id查询订单
//@route   get/api/orders/:id
//@access  私密
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('查询不到订单')
  }
})

//@desc    获取所有订单
//@route   GET/api/orders
//@access  私密(仅限管理员)
export const getOrders = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageSize) || 6
  const page = Number(req.query.pageNumber) || 1

  const count = await Order.countDocuments()
  const orders = await Order.find({}).populate('user', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ orders, page, pageSize, pages: Math.ceil(count / pageSize) })


})

//@desc    更新支付的订单付款状态
//@route   PUT/api/orders/:id/pay
//@access  私密
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('查找不到订单')
  }
})

//@desc    更新支付的订单的发货状态
//@route   PUT/api/orders/:id/deliver
//@access  私密（仅限管理员）
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('查找不到订单')
  }
})

//@desc    获取登录用户的订单
//@route   GET/api/orders/myorders
//@access  私密
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})


