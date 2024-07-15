const express = require('express');
const bodyParser = require('body-parser');
const {
  ContactModel,
  Pager,
  sortContacts,
  filterContacts
} = require("@jworkman-fs/asl");

// Error classes
class ResourceUnreachableError extends Error {}
class InvalidContentTypeError extends Error {}
class ApiTestingError extends Error {}
class InvalidContactSchemaError extends Error {}
class PaginationResultCountError extends Error {}

module.exports = { ResourceUnreachableError, InvalidContactSchemaError, InvalidContentTypeError, ApiTestingError, PaginationResultCountError };

const app = express();
const port = 8080; 

app.use(bodyParser.json());

// Load contacts
let contacts = [];

try {
  if (ContactModel && Array.isArray(ContactModel.contacts)) {
    contacts = ContactModel.contacts;
    console.log(`Loaded ${contacts.length} contacts.`);
  } else {
    throw new Error('Contacts data is missing or invalid.');
  }
} catch (error) {
  console.error(`Failed to load contacts: ${error.message}`);
  contacts = []; // Use empty data or handle as needed
}

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, req.body);
  next();
});

// CRUD Operations

app.post('/v1/contacts', (req, res) => {
  const newContact = req.body;
  if (!newContact.fname || !newContact.lname) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  newContact.id = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
  contacts.push(newContact);
  res.status(303).header('Location', `/v1/contacts/${newContact.id}`).json(newContact);
});

// Read all contacts
app.get('/v1/contacts', (req, res) => {
  let result = contacts;

  // Filter
  if (req.headers['x-filter-by'] && req.headers['x-filter-operator'] && req.headers['x-filter-value']) {
    const filter = {
      by: req.headers['x-filter-by'],
      operator: req.headers['x-filter-operator'],
      value: req.headers['x-filter-value']
    };
    result = filterContacts(result, filter);
  }

  // Sort
  if (req.query.sort) {
    const sort = {
      by: req.query.sort,
      direction: req.query.direction || 'asc'
    };
    result = sortContacts(result, sort);
  }

  // Validate and Parse Pagination Parameters
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: 'Invalid pagination parameters.' });
  }

  // Manual Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  result = result.slice(startIndex, endIndex);

  res.status(200).json(result);
});




// Read a specific contact
app.get('/v1/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id, 10));
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.status(200).json(contact);
});

// Update a contact
app.put('/v1/contacts/:id', (req, res) => {
  const contactId = parseInt(req.params.id, 10);
  const updatedContact = req.body;

  const index = contacts.findIndex(c => c.id === contactId);
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  contacts[index] = { ...contacts[index], ...updatedContact };
  res.json(contacts[index]);
});

// Delete a contact
app.delete('/v1/contacts/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  const deletedContact = contacts.splice(index, 1);
  res.status(200).json(deletedContact);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
