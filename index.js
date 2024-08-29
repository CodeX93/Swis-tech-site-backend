require('dotenv/config');
const express = require('express');
const cors =require ('cors')
const mongoose = require('mongoose');
const clientRecordsRouter = require('./routes/clientRecord');
const pendingRecordsRouter = require('./routes/pendingRecord');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://aghashahhyder:OWBlhg2BP1ha7QPB@switch-prod.c381v.mongodb.net/").then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Connection error', error.message);
});

app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
  res.send('RUNNING');
})
app.use('/api/client-records', clientRecordsRouter);
app.use('/api/pending-records', pendingRecordsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// aghashahhyder
// OWBlhg2BP1ha7QPB