const express = require("express");
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000
let id;

app.use(express.static(__dirname+'/public'));
app.get("/" , (req , res)=>{res.send("hello")});

// app.get('*' ,(req , res)=>{
   
//     res.sendFile(__dirname+'/public/index.html');
// } )

app.get("/user/:userid" , (req , res)=>{
      id = req.params.userid
      console.log(id);
   // socket.id = req.params.userid;
   // console.log(socket.id + "hello")
    res.sendFile( __dirname +'/public/index.html' );
})

let arr = [];
io.on('connection', (socket) => {
    //console.log('connected')
    arr.push(socket.id);
    console.log(socket.id);
    console.log("----->")

    if(id==0)
    {
        socket.on('message', (evt) => {
            //console.log(evt);
         //socket.broadcast.to(socket.id).emit('message', evt)
           io.to(arr[1]).emit('message', evt);
    
        })
    }
    if(id==1)
    {
        socket.on('message', (evt) => {
            //console.log(evt);
         //socket.broadcast.to(socket.id).emit('message', evt)
           io.to(arr[0]).emit('message', evt);
    
        })

    }
    
})
io.on('disconnect', (evt) => {
    console.log('some people left');
})

http.listen(port, () => console.log(`server listening on port: ${port}`))