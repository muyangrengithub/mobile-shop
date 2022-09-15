import asyncHandler from 'express-async-handler'
import productModel from '../models/productModel.js'

//@desc    请求所有产品
//@route   GET/api/products?keyword=${keyword}
//@access  公开
export const getProducts = asyncHandler(async (req, res) => {
    //每页展示的产品数量
    let pageSize =Number(req.query.pageSize)
    let page =Number(req.query.pageNumber)
    if (!pageSize && !page) {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {}
      
        const products = await productModel.find({ ...keyword })
        res.json({products})
    } else {
        pageSize = pageSize || 6
        page = page || 1

        //获取产品数量（包括符合条件的关键词）
        const count = await productModel.countDocuments()
        const products = await productModel.find()
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        res.json({ products, page,pageSize, pages: Math.ceil(count / pageSize) })
    }


})

//@desc    请求单个产品
//@route   GET/api/products/:id
//@access  公开
export const getProductById = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            message: '查询不到产品'
        })
    }

})

//@desc    删除单个产品
//@route   DELETE/api/products/:id
//@access  私密(仅限管理员)
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: '产品删除成功' })
    } else {
        res.status(404).json({
            message: '查询不到产品'
        })
    }

})

//@desc    添加产品
//@route   POST/api/products
//@access  私密(仅限管理员)
export const createProduct = asyncHandler(async (req, res) => {
    const product = new productModel({ ...req.body, user: req.user._id })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})

//@desc    修改产品
//@route   PUT/api/products/:id
//@access  私密(仅限管理员)
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)

    if (product) {
        await productModel.updateOne({ _id: req.params.id }, req.body)
        const updateproduct = await productModel.findById(req.params.id)
        res.json(updateproduct)
    } else {
        res.status(404).json({
            message: '查询不到产品'
        })
    }
})

//@desc    创建产品评论
//@route   POST/api/products/:id/reviews
//@access  私密
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await productModel.findById(req.params.id)

    if (product) {
        //判断用户是否已经评论
        const alreadeReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        )

        if (alreadeReviewed) {
            res.status(400)
            throw new Error('您已经评论过该产品！')
        }

        //创建新评论
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        product.reviews.push(review)
        //更新产品的评论数及总评分
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: '评论成功' })
    } else {
        res.status(404)
        throw new Error('查询不到产品')
    }
})

//@desc    请求排名前3的产品
//@route   GET/api/products/top
//@access  公开
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find({}).sort({ price: 1 }).limit(3)
  
    res.json(products)
  })