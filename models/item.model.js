const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ItemSchema = new Schema({
  numero: { type: Number, required: true },
  criador: { type: Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'itens' })

// Export the model
module.exports = mongoose.model('Item', ItemSchema)
