const {app} = require('./config/server')
require('./database/config/dbConnect')
require('./routes/routes')(app)
