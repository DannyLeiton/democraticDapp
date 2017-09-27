import mongoose from 'mongoose'

const Schema = mongoose.Schema


const Process = new Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: Number, required: true },
    initialDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    voteType: { type: String, required: true },
    votingType: { type: String, required: true },
    withProgress: { type: Boolean, required: true },
    options: { type: String, required: true },
  }
)

export default mongoose.model('Process', Process)
