const express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser');
var ApiRouter = require('./src/routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());
app.use('/api/consumer', ApiRouter);
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'A short description of your API',
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);