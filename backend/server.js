import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import {errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();


connectDB() //连接数据库

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
  

app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/user',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload', uploadRoutes)

  
//upload文件夹作为静态文件
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
  } else {
    app.get('/', (req, res) => {
      res.send('服务器已经运行...')
    })
  }

app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log( `服务器在${process.env.NODE_ENV}模式下的${PORT}端口号运行`.yellow.bold))