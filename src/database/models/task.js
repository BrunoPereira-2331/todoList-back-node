const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: String,
  finished: Boolean,
}, {
  timestamps: true,
})

module.exports = mongoose.model('Task', TaskSchema);

