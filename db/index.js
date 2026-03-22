const mongoose = require('mongoose');
const url="mongodb://localhost:27017/udemydb";
mongoose.connect(url);

//admin schema
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});
//user schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Course' }]
});

//couse schema
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Course = mongoose.model('Course', CourseSchema);
 module.exports = {User, Admin, Course};