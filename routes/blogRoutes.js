//blog routes..
const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController');

router.get('/', blogController.allblogs);
router.get('/create',blogController.create_blog);
router.get('/:id',blogController.blog_details);
router.post('/',blogController.create_blog_post);
router.delete('/:id',blogController.deleteblog);

module.exports=router;