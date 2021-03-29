const express = require('express')
const ObjectID=require('mongodb').ObjectID;
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4n73f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
app.use(cors())
app.use(express.json())

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err);
  const collection = client.db("volunteer").collection("events");

  app.get('/events',(req,res)=>{
    collection.find()
    .toArray((err,items)=>{
      res.send(items);
      console.log('from database',items);
    
    })
  })

  app.post('/addEvents', (req, res) => {
    const newEvent = req.body;
    console.log('event', newEvent);
    collection.insertOne(newEvent)
      .then(result => {
        console.log('inserted', result.insertedCount);
        res.send(result.insertedCount > 0);
      })
  })

app.delete('/delete/:id',(req,res)=>{
  console.log(req.params.id);
  // const id=ObjectID(req.params.id);
  // collection.deleteOne({_id:id})

})
  console.log('db connected');
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)