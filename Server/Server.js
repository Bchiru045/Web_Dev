// server.js (backend)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/introduction/intro_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const FormModel = mongoose.model('Form', {
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  message: String,
});

// Middleware
app.use(bodyParser.json());

// API endpoint for submitting form data
app.post('/api/submitFormData', async (req, res) => {
  try {
    const formData = req.body;
    const formEntry = new FormModel(formData);
    await formEntry.save();
    res.status(201).send('Form data saved successfully!');
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
