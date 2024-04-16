const express = require('express')
const app = express()
const mongoose = require('mongoose')
const contact = require('./models/contact.model.js')
app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello World from API');
});

app.post('/api/contacts', async(req, res) => {
  try {
    const contactCreated = await contact.create(req.body);
    res.status(200).json({contactCreated})
  } catch {
    res.status(500).json({message: error.message})
  }
});

app.get('/api/contacts', async(req, res) => {
  try {
    const contacts = await contact.find({});
    res.status(200).json(contacts)
  } catch {
    res.status(500).json({message: error.message})
  }
});

app.get('/api/contact/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const getcontact = await contact.findById(id);
    res.status(200).json(getcontact);
  } catch {
    res.status(500).json({message: error.message})
  }
});

app.put('/api/contact/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const getcontact = await contact.findByIdAndUpdate(id, req.body);

    if (!getcontact) {
      return res.status(404).json({message: 'Contact not found'})
    }
    
    const updatedcontact = await contact.findById(id);
    res.status(200).json(updatedcontact);
  } catch {
    res.status(500).json({message: error.message})
  }
});

app.delete('/api/contact/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const delcontact = await contact.findByIdAndDelete(id);

    if (!delcontact) {
      return res.status(404).json({message: 'Contact not found'})
    }
    
    res.status(200).json({message: "Contact deleted"});
  } catch {
    res.status(500).json({message: error.message})
  }
})

mongoose.connect('#')
.then(() => {
    console.log('Connected to database');
  })
.catch(() => {
    console.log('Connection to database failed'); 
  })
