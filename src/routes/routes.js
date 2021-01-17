// const tasks = require('./task.routes')
const tasks = require('../controllers/tasks')
const history = require('../controllers/history')

module.exports = (app) => {
  app.post('/tasks', (req, res) => tasks.create(req, res));

  app.get('/tasks', (req, res) => tasks.findAll(req, res));

  app.get('/tasks/:taskId', (req, res) => tasks.findById(req, res));
  
  app.put('/tasks/:taskId', (req, res) => tasks.update(req, res));

  app.delete('/tasks/:taskId', (req, res) => tasks.delete(req, res));

  app.post('/history', (req, res) => history.create(req, res));

  app.get('/history', (req, res) => history.findAll(req, res))

  app.get('/history/:taskId', (req, res) => history.findById(req, res));

  app.put('/history/:taskId', (req, res) => history.update(req, res));

  app.delete('/history/:taskId', (req, res) => history.delete(req, res));

}