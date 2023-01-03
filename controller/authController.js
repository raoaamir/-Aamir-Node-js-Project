const User = require('../models/user')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) =>{
    return jwt.sign({id} , process.env.SECRETKEY ,{
        expiresIn :maxAge
    } )
}
// controller actions
const signup_view = (req , res) => {
    res.render('signup',{title : 'Sign Up'});
  }
  
  const login_view = (req ,res) => {
    res.render('login' , {title : 'Log In'});
  }
  
  const signup = async(req, res) => {
    const {email ,password} = req.body

    try {
        const user = await User.create({email ,password})
        const token = createToken(user._id)
        res.cookie('jwt' , token ,{httpOnly : true , maxAge : maxAge*1000})
        res.status(201).json({user : user._id})
        
    } catch (err) {
        const errors = err.message
        res.status(400).json({errors})
        
    }
  }
  
  const login = async (req, res) => {
    const {email ,password} = req.body;

    try {
        const user =await User.login(email , password)
        const token = createToken(user._id)
        res.cookie('jwt' , token ,{httpOnly : true , maxAge : maxAge*1000})
        res.status(200).json({user :user._id})
        
    } catch (err) {
        const errors = err.message
        res.status(400).json({errors})
        
    }
}

  const logout = (req ,res)=>{
    res.cookie('jwt' , '' ,{maxAge : 1})
    res.redirect('/')

  }

  module.exports ={
    signup_view,
    login_view,
    logout,
    signup,
    login,

  }
  