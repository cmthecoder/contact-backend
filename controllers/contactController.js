const asyncHandler = require('express-async-handler')
// Import the model
const Contact = require('../models/contactModel')

// GET all contacts
// GET /api/contacts
// access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()

  res.status(200).json(contacts)
})


// POST create contact
// POST /api/contacts
// access public

const createContact = asyncHandler(async (req, res) => {
  console.log("REQ.BODY", req.body);

  const {name, email, phone} = req.body

  if(!name || !email || !phone){
    res.status(400)
    throw new Error("All fields are required!")
  }

  const contact = await Contact.create({
    name,
    email,
    phone
  })

  res.status(201).json(contact)
})

// GET get a contact
// GET /api/contacts/:id
// access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if(!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  res.status(200).json(contact)

})
// PUT create contact
// PUT /api/contacts/:id
// access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if(!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedContact)
})
// DELETE delete a contact
// DELETE /api/contacts/:id
// access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}`})
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}