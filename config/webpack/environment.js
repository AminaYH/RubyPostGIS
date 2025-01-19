const { environment } = require('@rails/webpacker')
const typescript =  require('./public/typescript')

environment.loaders.prepend('typescript', typescript)
module.exports = environment