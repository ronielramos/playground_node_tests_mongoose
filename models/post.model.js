const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PostSchema = new Schema({
  texto: { type: String, required: true, max: 200 },
  criador: { type: Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'postagens' })

// Export the model
module.exports = mongoose.model('Post', PostSchema)
