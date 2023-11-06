//all blogs, blog_details,blog_create_get,blog_create_post,blog_delete..
const Blog=require('../models/blog');

const allblogs=(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result=>{
        res.render('blogs/index',{title:'All Blogs',blogs:result})
    })
    .catch(err=>console.log(err))
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('blogs/details',{blog:result,title:'Blog Details'})
    })
    .catch(err=>res.render('404',{title:'error'}))
};
 const create_blog=(req,res)=>{
    res.render('blogs/create',{title:"create"});
};

const create_blog_post=(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
   //Blog.create(req.body)
    .then(result=>res.redirect('/blogs'))
    .catch(err=>console.log(err))
};

 const deleteblog=(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'});
    })
    .catch(err=>console.log(err))
};
const updateblog=(req,res)=>{
    Blog.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(result=>res.redirect('/blogs'))
    .catch(err=>res.send({error:err.message})
};
module.exports={
    allblogs,
    blog_details,
    create_blog,
    create_blog_post,
    updateblog,
    deleteblog
}