const asyncHandler = require('express-async-handler')
// GET all contacts
// GET /api/contacts
// access public

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contacts"})
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

  res.status(201).json({ message: "Create contact"})
})
// GET get a contact contact
// GET /api/contacts/:id
// access public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}`})

})
// PUT create contact
// PUT /api/contacts/:id
// access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}`})
})
// DELETE delete a contact
// DELETE /api/contacts/:id
// access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}`})
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}