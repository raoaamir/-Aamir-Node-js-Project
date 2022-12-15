const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

    owner :{
        type : String,
        
    },
    title : {
        type : String,
        required :true,
    },
    snippet :{
        type : String,
        required :true
    },
    body :{
        type : String,
        required :true
    },
  
},{
    timestamps :true
})

const  Blogs = mongoose.model('blog' , blogSchema)

module.exports = Blogs