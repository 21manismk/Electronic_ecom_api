const express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser');
const swaggerDocument = require('./swagger.json');
var ApiRouter = require('./src/routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fileUpload = require('express-fileupload');
const cookieparser = require("cookie-parser");
var corsOptions = {
  origin: ["*",],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
};
const app = express()
const port = 3000
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());
app.use(fileUpload());
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());
app.use('/api/v1/s3/', ApiRouter);
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);