const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
 app.post('/insert', (req, res) => {
  async function insert() {
    try {
      
      res.send("movie");
    }catch(e){

    }
  }
 
  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})