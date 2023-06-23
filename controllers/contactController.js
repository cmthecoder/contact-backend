const asyncHandler = require('express-async-handler')
// Import the model
const Contact = require('../models/contactModel')

// GET all contacts
// GET /api/contacts
// access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id})

  res.status(200).json(contacts)
})


// POST create contact
// POST /api/contacts
// access private

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
    phone,
    user_id: req.user.id
  })

  res.status(201).json(contact)
})

// GET get a contact
// GET /api/contacts/:id
// access private

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
// access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if(!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  if(contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User does not have permission to update other users contacts')
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedContact)
})
// DELETE delete a contact
// DELETE /api/contacts/:id
// access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if(!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  if(contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User does not have permission to update other users contacts')
  }

  await Contact.deleteOne(contact)

  res.status(200).json(contact)
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}