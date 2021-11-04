const Contact = require('../model/contact')

const listContacts = async (userId, query) => {
  const { sortBy, sortByDesc, isFavorite = null, limit = 5, offset = 0 } = query
  const searchOptions = { owner: userId }
  if (isFavorite !== null) {
    searchOptions.isFavorite = isFavorite
  }
  const results = await Contact.paginate(searchOptions, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    populate: {
      path: 'owner',
      select: 'name email subscription createdAt updatedAt',
    },
  })
  const { docs: contacts } = results
  delete results.docs
  return { ...results, contacts }
}

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription createdAt updatedAt',
  })
  return result
}

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })
  return result
}

const addContact = async body => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, userId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
