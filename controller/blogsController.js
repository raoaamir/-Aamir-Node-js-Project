const Blogs = require('../models/blog')

const blog_index =(req ,res)=>{
    Blogs.find().sort({createdAt : -1})
    .then((result)=>{
        res.render('blogs/index', { title: 'All Blogs' , blogs : result})
    })

    .catch((err)=>{
        console.log(err)
    })
}

const blog_allBlogs =(req ,res)=>{
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

const blog_update =(req ,res)=>{
    Blogs.findById(req.params.id)
    .then((result)=>{
        res.render('blogs/edit', { title: 'All Blogs' , blog : result})
    })

    .catch((err)=>{
        console.log(err)
    })
} 

const blog_create_get = (req ,res)=>{
res.render('blogs/create',{title: 'Create New Blog'});
}

const blog_create_post = (req ,res)=>{
    const blog = new Blogs(req.body)

    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
}



const blog_update_Put = async (req ,res)=>{
 try {
    console.log('req fired')
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
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_allBlogs,
    blog_update,
    blog_update_Put
}