
const express     =   require('express');
const bodyParser  =   require('body-parser');
const cors        =   require('cors');
const app         =   express();
const path        =   require("path");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

require("dotenv").config( );

const taskRoutes            = require('./src/routes/taskmanagement.route');

const port     =  process.env.PORT || 9060;
const baseUrl  = '/api/v1';

// TASK ROUTES
app.use(baseUrl,taskRoutes);


app.set('view',path.join(__dirname,'view'));
app.set('view engine','ejs');

app.get("/",(req,res)=>{
  
    res.send(
         "<div style='background-color:black;text-align:center;height:100%'><h3 style='padding:150px;color:blue;text-decoration:underline'> WELCOME  TO  MEAN STACK  BACKEND  APPLICATION </h3> </div>"
    );
})


//listining the port
app.listen(port,()=>{
    console.log("Express server is running at PORT "+port);
})

         ///////////////////////////////////////////////////////////////////////////////////////////////

