const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const adminRouter=require('./routes/admin');
const userRoutes=require('./routes/user');

app.use(bodyParser.json());
app.use("/admin", adminRouter);
 app.use('/user', userRoutes);

 const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

