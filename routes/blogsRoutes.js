const express = require('express');
const blogsController = require('../controller/blogsController')
const router = express.Router();
router.get('/allBlogs' , blogsController.blog_allBlogs)
router.post('/' , blogsController.blog_create_post)
router.get('/create', blogsController.blog_create_get)
router.get('/' ,blogsController.blog_index)
router.get('/:id',blogsController.blog_detail)
router.delete('/:id' , blogsController.blog_delete)
router.get('/edit/:id' , blogsController.blog_update)
router.put('/:id',blogsController.blog_update_Put)

module.exports = router;