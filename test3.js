const sift = require('sift');
const { BadRequest, NotFound, ServerError } = require('./test/utils/errors');

class Server {
  constructor (db) {
    this.db = db
  }

  find(collectionName, query) {
      if (!this.db[collectionName] || !query) return new BadRequest()

      const collection = this.db[collectionName]
      if (!Array.isArray(collection)) return new NotFound()

      const queryDocument = collection.filter(sift(query))
      if (!queryDocument.length) return new NotFound()
      return queryDocument
  }

  findOne(collectionName, id) {
    return {}
  }

  updateOne(collectionName, id, properties) {
    return {}
  }
}

module.exports = Server;
