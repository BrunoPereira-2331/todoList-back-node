const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const dbConfig = require('./database/config/database-config');
const cors = require('cors');
const app = express();
// const router = express.Router();
const PORT = 8080;

// const {tasks, history} = require('./routes/routes');

// mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// }).then(() => {
//   console.log('Successfully connected to the database')
// }).catch(err => {
//   console.log('Could not connect to the database.', err);
//   process.exit();
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {app}