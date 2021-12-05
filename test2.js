const { NotFound, ServerError } = require('./test/utils/errors');

module.exports = async function Test2 (server, queries) {
    const response = await server.query(queries)
    const responseParse = JSON.parse(response)
    
    if (response instanceof ServerError) return response // response is a ServerError because the server has been crashed.
    if (!response || !Array.isArray(responseParse)) return new ServerError()
    if (!responseParse.length) return new NotFound()
    
    return responseParse
}
