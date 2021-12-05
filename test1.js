
module.exports = function Test1(server) {
  return new Promise(resolve => server.on('name', resolve))
}
