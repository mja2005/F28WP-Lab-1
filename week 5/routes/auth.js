const express=require("express");
const router=express.Router();
const authController=require('../controllers/auth')

router.post('/register',authController.register)
router.post('/loginp',authController.loginp)
router.get('/profile',authController.profile)
router.get('/logout',authController.logout)




module.exports=router;

