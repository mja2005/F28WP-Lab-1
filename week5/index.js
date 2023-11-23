const express =require('express');
const mysql=require('mysql');
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser')
const app=express();
const port =5000
dotenv.config({path:'./.env'})

const db =mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Mysql Connected....')
    }
});
const publicDirectory=path.join(__dirname, './public');
app.use(express.static(publicDirectory))
app.set('view engine','hbs');
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//define routes for pages,auth,login pages
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

//use cookie parser
app.use((req, res, next) => {
    console.log('Cookies:', req.cookies);
    next();
});



//listen() method to show the connection to database
app.listen (port,() =>{
    console.log(`Server started on port ${port}`);
});