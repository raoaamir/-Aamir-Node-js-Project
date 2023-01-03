const express = require('express');
const blogsController = require('../controller/blogsController')
const auth =require('../middleWare/authMiddleware')
const router = express.Router();
router.get('/allBlogs',auth.requireAuth , blogsController.allblogs)
router.post('/' ,auth.requireAuth, blogsController.create_blog)
router.get('/create',auth.requireAuth, blogsController.create)
router.get('/' ,auth.requireAuth,blogsController.view_blogs)
router.get('/:id',auth.requireAuth,blogsController.blog_detail)
router.delete('/:id' ,auth.requireAuth, blogsController.blog_delete)
router.get('/edit/:id' ,auth.requireAuth, blogsController.blog_update)
router.put('/:id',auth.requireAuth,blogsController.edit)

module.exports = router;