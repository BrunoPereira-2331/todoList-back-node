const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
  title: String,
  finished: Boolean,
}, {
  timestamps: true,
})

module.exports = mongoose.model('History', HistorySchema);

