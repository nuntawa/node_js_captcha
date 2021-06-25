var express=require("express");
var app=express();
var path = require("path");
var port=process.env.PORT || 3000;

// import library
var captcha = require("nodejs-captcha");
// Create new Captcha

cap_value=null;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname+'/public/index.html'));
   
});

app.get("/capcha",(req,res)=>{

    var cap = captcha();
    cap_value=cap.value;
    cap_image = cap.image;
    console.log(cap_value);
    res.send({"cap_image":cap_image});
     
   
});

app.post("/check_capcha",(req,res)=>{

   if( cap_value==req.body.cap_value)
   {
        res.send("True");
   }
   else
   {
        res.send("False");
   }
     
   
});




app.get('*', (req, res)=>{
    res.status(404).send('Page Not Found');
});

app.listen(port);
console.log("server start");