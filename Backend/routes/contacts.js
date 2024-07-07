const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new contact
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.body.image
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing contact
router.put('/:id', async (req, res) => {
  const { name, email, phone, image } = req.body;
  const { id } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone, image }, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
