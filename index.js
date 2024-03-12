const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://yashgoel:AXWPUySjhdIzYUvd@cluster0.9hgkis6.mongodb.net/?retryWrites=true&w=majority', {
 
})
.then(() => console.log('MongoDB Atlas connected successfully')) // Log successful connection
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define Schema
const dealSchema = new mongoose.Schema({
  _id: String,
  dealOwner: String,
  dealName: String,
  accountName: String,
  type: String,
  nextStep: String,
  leadSource: String,
  contactName: String,
  amount: Number,
  closingDate: String,
  stage: String,
  probability: String,
  expectedRevenue: String,
  campaginSource: String,
  description: String,
});

// Define Model
const Deal = mongoose.model('Deal', dealSchema);

// API Endpoint to fetch data
app.get('/api/deals', async (req, res) => {
  try {
    const data = await Deal.find(); // Fetch all data from MongoDB Atlas
    res.json(data);
    console.log('Fetched data:', response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/deals', async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();
    res.status(201).send(deal);
  } catch (error) {
    console.error('Error saving deal:', error);
    res.status(500).send('Error saving deal.');
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
