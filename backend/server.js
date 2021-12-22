const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const api = require('./routes/api');
const cors =require('cors');


const swaggerDefinition = {
    info: {
      title: 'Github API',
      version: '1.0.0',
      description: 'This is the Github API documentation',
    },
    host: 'localhost:5000',
    servers:[
        {
            url: "http://localhost:5000"
        }
    ]
  };
  
const swaggerOptions = {
    swaggerDefinition: swaggerDefinition, 
    apis: [
      './routes/*.js',
    ], 
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.use(bodyParser.json());
app.use(cors());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
})

app.use(express.json()); 

app.use('/api', api);

app.listen(5000);

