import mongoose from 'mongoose'

const TaskItemSchema = new mongoose.Schema({
  summary: String,
  description: String,
  status: {
    type: String,
    enum: ['todo', 'done'],
    default: 'todo'
  }
})

export default mongoose.model('Task', TaskItemSchema)
