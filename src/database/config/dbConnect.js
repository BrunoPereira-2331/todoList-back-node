const mongoose = require('mongoose');
const dbConfig = require('./database-config');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});
