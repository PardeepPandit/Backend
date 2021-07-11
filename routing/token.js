const express=require('express')
const { generateToken } = require('../paymentController')

const router=express.Router()

router.get('/',generateToken)

module.exports=router
//backend