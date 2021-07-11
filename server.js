const express=require('express')
const cors=require('cors')
const app=express()
const paymentRoute=require('./paymentRoute')
const { generateToken, processPayment } = require('./paymentController')


app.use(cors())
app.use(express.json())


const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://ne-game-app.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}



//app.get('/',(req,res)=>res.json({msg:"payment gateway braintree..."}))

app.use('/api/generate/token',require('./routing/token'))
app.use('/api/process/payment',require('./routing/payment'))
/* app.use('/process/payment',) */
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port=process.env.PORT || 5000;
app.listen(port,()=>{
console.log(`App is running at ${port}`);
})