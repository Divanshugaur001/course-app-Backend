const {Router} = require('express');
const router = Router();
const UserMiddleware = require('../middleware/user');
const {User, Course} = require('../db');

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    await User.create({username, password});
    res.json({message: 'User created successfully'});
});

router.post('/login', async (req, res) => {
    const {username, password} = req.headers;
    const user = await User.findOne({username, password});
    if(user){
        res.json({message: 'Logged in successfully'});      
    }else{
        res.status(403).json({message: 'Login failed'});
    }
});

router.get('/courses',  async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
});

router.post('/courses/:courseId', UserMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId); 
    if(course && course.published){
        const username = req.headers.username;
        const user = await User.findOne({username});    
        if(user){
            user.purchasedCourses.push(courseId);
            await user.save();

            res.json({message: 'Course purchased successfully'});
        }
    }else{
        res.status(404).json({message: 'Course not found or not published'});
    }
});

router.get("/purchasedCourses",UserMiddleware, async(req,res)=>{
const user= User.findOne({username: req.headers.username});
const courses= await Course.find({
    _id:{
        "$in":user.purchasedCourses
    }
});
res.json({
    courses:courses
})

});

module.exports = router;
