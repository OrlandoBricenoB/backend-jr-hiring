const sift = require('sift');
const { BadRequest, NotFound, ServerError } = require('./test/utils/errors');

class Server {
  constructor (db) {
    this.db = db
  }

  _getCollection(collectionName, query) {
    if (!this.db[collectionName]) return [new BadRequest(), null]
    if (!query) return [new NotFound(), null]

    const collection = this.db[collectionName]
    if (!Array.isArray(collection)) return [new NotFound(), null]

    return [null, collection]
  }

  _editNotFoundMsg(error, message) {
    error.message = message
    return error
  }

  find(collectionName, query) {
    const [error, collection] = this._getCollection(collectionName, query)
    if (error) return error

    const queryDocuments = collection.filter(sift(query))
    if (!queryDocuments.length) return new NotFound()
    return queryDocuments
  }

  findOne(collectionName, id) {
    const query = id && { id: { $eq: id } }
    const [error, collection] = this._getCollection(collectionName, query)
    if (error) return this._editNotFoundMsg(error, 'No data found with the id equal as "null".') 

    const queryDocuments = collection.filter(sift(query))
    const [ firstDocument ] = queryDocuments
    return firstDocument
  }

  updateOne(collectionName, id, properties) {
    const query = id && { id: { $eq: id } }
    const [error, collection] = this._getCollection(collectionName, query, properties)
    if (error) return this._editNotFoundMsg(error, 'No data for update found with the id equal as "null".') 

    const queryDocuments = collection.filter(sift(query))
    const [ firstDocument ] = queryDocuments

    const updatedDocument = Object.assign(firstDocument, properties)
    return updatedDocument
  }
}

module.exports = Server;
