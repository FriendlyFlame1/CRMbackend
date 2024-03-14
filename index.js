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
  campaignSource: String,
  description: String,
});

// Define Model
const Deal = mongoose.model('Deal', dealSchema);

// API Endpoint to fetch data
app.get('/api/deals', async (req, res) => {
  try {
    const data = await Deal.find({ dealOwner: "SM2" }); // Fetch all data from MongoDB Atlas
    res.json(data);
    
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
app.get('/api/deals/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deal = await Deal.findById(id);
    
    if (!deal) {
      console.log('Deal not found for ID:', id);
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    console.error('Error fetching deal details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to update deal details by ID
app.put('/api/deals/:id', async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const deal = await Deal.findByIdAndUpdate(id, newData, { new: true });
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    console.error('Error updating deal details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
