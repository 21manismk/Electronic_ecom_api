const express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser');
const swaggerDocument = require('./swagger.json');
var ApiRouter = require('./src/routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const app = express()
const port = 3000
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());
app.use('/api/consumer', ApiRouter);
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);