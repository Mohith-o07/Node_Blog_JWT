//blog routes..
const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController');

router.get('/', blogController.allblogs);
router.get('/create',blogController.create_blog);
router.get('/:id',blogController.blog_details); //check index.ejs
router.get('/update/:id', blogController.get_update_form);
router.post('/',blogController.create_blog_post);
router.post('/:id', blogController.update_blog);
router.delete('/:id',blogController.deleteblog);

module.exports=router;