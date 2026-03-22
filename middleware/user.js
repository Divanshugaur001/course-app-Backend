const {User}= require('../db');

UserMiddleware = (req, res, next) => {
const username = req.headers.username;
const password = req.headers.password;
User.findOne({username: username, password: password}).then(user => {
    if(user){
        next();
    }else{
        res.status(403).json({message: 'User authentication failed'});
    }       
} )
}   
module.exports = UserMiddleware;