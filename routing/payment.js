const express=require('express')
const {processPayment } = require('../paymentController')

const router=express.Router()

router.post('/',processPayment)

module.exports=router