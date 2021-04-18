const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
  id: String,
  memberName: String,
  memberCode: String,
  description: String,
  starRating: String,
  email: String,
  name: String,
  password: String
}, { timestamps: true, versionKey: false })

const MemberModel = mongoose.model('Member', memberSchema)

module.exports = MemberModel
