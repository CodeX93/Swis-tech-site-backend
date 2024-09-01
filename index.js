require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const clientRecordsRouter = require('./routes/clientRecord');
const pendingRecordsRouter = require('./routes/pendingRecord');
const PendingRecord = require('./models/PendingRecord');  // Import the PendingRecord model

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB Atlas
mongoose.connect(process.env.mong_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    
    
    // updateExistingRecords().catch(console.error);
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('RUNNING');
});

app.use('/api/client-records', clientRecordsRouter);
app.use('/api/pending-records', pendingRecordsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to update existing records without an OrderDate
// async function updateExistingRecords() {
//   await PendingRecord.updateMany(
//     { orderDate: { $exists: false } },  // Check if orderDate does not exist
//     { $set: { orderDate: new Date() } }  // Set orderDate to the current date
//   );

//   console.log('Records updated successfully');
// }
