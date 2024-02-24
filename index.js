const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://yashgoel:AXWPUySjhdIzYUvd@cluster0.9hgkis6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected successfully')) // Log successful connection
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define Schema
const dataSchema = new mongoose.Schema({
  // Define your schema fields here
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  gender: String,
  city: String,
  country: String,
  occupation: String
});

// Define Model
const DataModel = mongoose.model('Data', dataSchema);

// API Endpoint to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find(); // Fetch all data from MongoDB Atlas
    res.json(data);
    console.log('Fetched data:', response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
