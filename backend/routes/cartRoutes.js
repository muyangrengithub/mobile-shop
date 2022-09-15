import express from 'express'
import {getCart,updateCart,deleteCart} from '../controllers/cartController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').get(protect,getCart).put(protect,updateCart)
router.route('/:id').delete(protect,deleteCart)


export default router