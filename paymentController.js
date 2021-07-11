require('dotenv').config()
const braintree = require("braintree");
const { response } = require('express');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});


exports.generateToken=async(req,res)=>{
    console.log("calling")

const responce=await gateway.clientToken.generate({})
    res.status(200).send(responce)
}

exports.processPayment=async(req,res)=>{
  try {
    console.log("req body=",req.body)
    const nonceFromTheClient = req.body.payment_method_nonce;
    console.log("testing 1=",nonceFromTheClient)
  // Use payment method nonce here
    const amount=req.body
  const response=await gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  });
  console.log("process payment")
  res.status(200).send(response)
  } catch (error) {
    console.log("Error found=",error)
    res.status(500).send(error)
  }
  
}
/* exports.generateToken=(req,res)=>{
    console.log("calling")

gateway.clientToken.generate({}).then((response)=>{
    res.status(200).send(response)
}).catch(err=>res.status(500).send(err))
} */