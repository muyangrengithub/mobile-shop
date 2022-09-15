import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    cartItems:[],
    shippingAddress:{
      address: '江宁区',
      city: '南京市',
      postalCode: '22100',
      province: '江苏省',
    }
  },
  {
    name: 'Summer',
    email: 'summer@example.com',
    password: bcrypt.hashSync('123456', 10),
    cartItems:[],
    shippingAddress:{
      address: '江宁区',
      city: '南京市',
      postalCode: '22100',
      province: '江苏省',
    }
  },
  {
    name: 'Henry',
    email: 'henry@example.com',
    password: bcrypt.hashSync('123456', 10),
    cartItems:[],
    shippingAddress:{
      address: '江宁区',
      city: '南京市',
      postalCode: '22100',
      province: '江苏省',
    }
  },
]

export default users
