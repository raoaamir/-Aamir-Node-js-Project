const Blogs = require('../models/blog')

const view_blogs =(req ,res)=>{
    Blogs.find().sort({createdAt : -1})
    .then((result)=>{
        res.render('blogs/index', { title: 'All Blogs' , blogs : result})
    })

    .catch((err)=>{
        console.log(err)
    })
}

const allblogs =(req ,res)=>{
    Blogs.find().sort({createdAt : -1})
    .then((result)=>{
        res.render('blogs/allBlogs', { title: 'All Blogs' , blogs : result})
    })

    .catch((err)=>{
        console.log(err)
    })

}

const blog_detail =(req ,res)=>{
    const id = req.params.id
    Blogs.findById(id)
    .then((result)=>{
        res.render('blogs/detail' , {blog : result , title : 'Blogs Detail'} )
    })
    .catch((err)=>{
        res.status(404).render('404', {title : 'Blogs Not Found'})
    })
} 

const edit =(req ,res)=>{
    Blogs.findById(req.params.id)
    .then((result)=>{
        res.render('blogs/edit', { title: 'All Blogs' , blog : result})
    })

    .catch((err)=>{
        console.log(err)
    })
} 

const create = (req ,res)=>{
res.render('blogs/create',{title: 'Create New Blog'});
}

const create_blog = (req ,res)=>{
    const blog = new Blogs(req.body)

    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
}



const blog_update = async (req ,res)=>{
 try {
  
    const id  = req.params.id
    const blog = await Blogs.findByIdAndUpdate(id ,{
        
            title : req.body.title,
            snippet : req.body.snippet,
            body : req.body.body

        },{new:true})
        res.send({blog})
      
 } catch (e) {
    console.log(e)
 }
 
}

const blog_delete = (req ,res)=>{
    const id = req.params.id
    Blogs.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect : '/blogs/allBlogs'})
    })
}


module.exports = {
    view_blogs,
    blog_detail,
    create,
    create_blog,
    blog_delete,
    allblogs,
    blog_update,
    edit
}