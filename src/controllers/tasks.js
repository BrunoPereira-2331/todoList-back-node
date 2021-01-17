const Task = require('../database/models/task')
const { CONTENT_EMPTY, taskNotFound, taskCreateErr, taskUpdateErr} = require('./taskErrorsMessages/taskErrorsMessages');

// create and save and new Note

exports.create = (req, res) => {
  if(!req.body && !req.body.content) {
    return res.status(400).send({
      message: CONTENT_EMPTY
    })
  }
  
  const task = new Task({
    title: req.body.title || 'Untitiled Task',
    finished: req.body.finished,
  })

  task.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

exports.findAll = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.send(tasks);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      })
    })

};

exports.findById = (req, res) => {
  Task.findById(req.params.taskId)
    .then(task => {
      if(!task) {
        return res.status(404).send({
          message: taskNotFound(req.params.taskId),
        })
      }
      res.send(task);
    }).catch(err => {
      if(err.kind === "ObjectId") {
        return res.status(404).send({
          message: taskNotFound(req.params.taskId),
        })
      }
    })

};

exports.update = (req, res) => {
  if(!req.body && !req.body.content) {
    return res.status(400).send({
      message: CONTENT_EMPTY,
    })
  }

  Task.findByIdAndUpdate(req.params.taskId, {
    title: req.body.title || "Untitled Task",
    finished: req.body.finished || false,
  }, {new: true})
  .then(task => {
    if(!task) {
      return res.status(404).send({
        message: taskNotFound(req.params.taskId),
      })
    }
    res.send(task)
  }).catch(err => {
    if(err.kind === "ObjectId") {
      return res.status(404).send({
        message: taskNotFound(req.params.taskId),
      })
    }
    return res.status(500).send({
      message: taskUpdateErr(req.params.taskId),
    })
  })

};

exports.delete = (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
      if(!task) {
        return res.status(404).send({
          message: taskNotFound(req.params.taskId),
        })
      }
      res.send({
        id: req.params.taskId,
        message: `Task deleted successfully`
      })
    }).catch(err => {
      if(err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404),send({
          message: taskNotFound(req.params.taskId),
        })
      }
    })
};
