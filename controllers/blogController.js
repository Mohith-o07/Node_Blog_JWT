//all blogs, blog_details,blog_create_get,blog_create_post,blog_delete..
const Blog=require('../models/blog');

const allblogs=(req,res)=>{
    Blog.find().sort({updatedAt: -1,createdAt:-1})
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

const get_update_form = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/update', { blog: result, title: 'Update Blog' });
        })
        .catch(err => res.render('404', { title: 'error' }));
};

 const create_blog=(req,res)=>{
    res.render('blogs/create',{title:"create"});
};

const create_blog_post=(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
    .then(result=>res.redirect('/v1/blogs'))
    .catch(err=>console.log(err))
};

const update_blog = (req, res) => {
    //console.log(req.body,typeof req.body);
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { new: true })
        .then(result => {
            res.json({redirect:'/v1/blogs'});
        })
        .catch(err => console.log(err));
};

 const deleteblog=(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/v1/blogs'});
    })
    .catch(err=>console.log(err))
};
module.exports={
    allblogs,
    blog_details,
    create_blog,
    get_update_form,
    create_blog_post,
    update_blog,
    deleteblog
}