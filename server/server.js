const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Thought = require('./models/thought'); 
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
const app = express();
app.use(bodyParser.json());
const { body, validationResult } = require('express-validator');

app.post('/api/post-thought',
  body('thought').isLength({ min: 300 }).trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const thought = new Thought({ text: req.body.thought });
      await thought.save();
      console.log('Thought saved:', thought);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error saving thought:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

app.get('/api/read-thought', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    if (thoughts.length === 0) {
      return res.status(404).json({ message: "No thoughts found" });
    }
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    res.json({ thought: randomThought.text });
  } catch (error) {
    console.error('Error fetching thought:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to handle any undefined routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
