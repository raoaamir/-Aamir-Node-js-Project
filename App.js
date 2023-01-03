const express = require('express')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleWare/authMiddleware')
//express App
const App = express()
// Connect To Mongodb
const mongoose = require('mongoose')
const blogsRoutes = require('./routes/blogsRoutes');

//register view engine
App.set('view engine', 'ejs')
// middleware
App.use(express.static('public'));
App.use(express.json())
App.use(cookieParser())


//middleware & Static files
App.use(express.static('public'))
App.use(express.urlencoded({extended : true}))
App.get('*', checkUser)

App.get('/', (req, res) => {
    res.redirect('/blogs');
})


App.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// routes
App.use(authRoutes)
//blogs Routes

App.use('/blogs' ,blogsRoutes);


App.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})

mongoose.connect(process.env.DBURL ,{ useNewUrlParser : true , useUnifiedTopology : true})
.then(()=>App.listen(process.env.PORT))
.catch((err)=>console.log(err))


