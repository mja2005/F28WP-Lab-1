const express=require("express");
const router=express.Router();

router.get ("/",(req,res) => {
    //res.send ("<h1>HOME PAGE </h>")
    res.render("index");
});
router.get ("/register",(req,res) => {
    //res.send ("<h1>REGISTERATION PAGE </h>")
    res.render("register");
});

router.get("/loginp",(req,res)=>{
    res.render("loginp");
})
router.get("/profile",(req,res)=>{
    res.render("profile");
 })


 router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/auth/loginp');
        }
    });
});

module.exports=router;