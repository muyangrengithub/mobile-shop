import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
//用户
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
    },
    cartItems: [
        {
          qty: { type: Number },
          product: {
            type: mongoose.Schema.Types.ObjectId,
           // required: true,
            ref: 'Product',
          },
        },
      ],
      shippingAddress: {
        address: { type: String },
        city: { type: String},
        postalCode: { type: String },
        province: { type: String},
      }
},{
    timestamps:true
})

//实现用户密码加密
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


//实现用户密码是否匹配
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const User = mongoose.model('User', userSchema) 
export default User
