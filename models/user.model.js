const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  itens: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, { collection: 'usuarios' })

// Export the model
module.exports = mongoose.model('User', UserSchema)
