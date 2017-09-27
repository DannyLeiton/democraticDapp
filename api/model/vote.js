import mongoose from 'mongoose'

const Schema = mongoose.Schema


const Vote = new Schema(
  {
    processKey: { type: Schema.ObjectId, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
  }
)

export default mongoose.model('Vote', Vote)
