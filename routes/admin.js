const express=require('express');
const router=express.Router();
const adminMiddleware = require('../middleware/admin ');
const {Admin, Course}= require('../db');

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
await Admin.create({username, password});

res.json({message: 'Admin created successfully'});
}
);
 
router.post('/login', async (req, res) => {
    const {username, password} = req.headers;
    const admin = await Admin.findOne({username, password});
    if(admin){
        res.json({message: 'Logged in successfully'});  
    }else{
        res.status(403).json({message: 'Login failed'});
    }
}); 

router.post('/createCourse', adminMiddleware, async (req, res) => {    
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;
        const published = req.body.published;
        Course.create({title, description, price, imageLink, published}).then((course) => {
            res.json({message: 'Course created successfully', courseId: course._id});
        }).catch((err) => {
            res.status(500).json({message: 'Error creating course', error: err});
        });
    });

 router.get("/courses",adminMiddleware,async(req,res)=>{
const response=await Course.find({});
res.json({
    courses:response
})
    });
 
    
module.exports = router;