//blog routes..
const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController');

router.get('/', blogController.allblogs);
router.get('/createblogForm',blogController.create_blog);
router.get('/:id',blogController.blog_details); //check index.ejs
router.get('/updateblog/:id', blogController.get_update_form);
router.post('/createblog',blogController.create_blog_post);
router.post('/updateblog/:id', blogController.update_blog);
router.delete('/deleteblog/:id',blogController.deleteblog);

module.exports=router;
