const History = require('../database/models/history')
const { CONTENT_EMPTY, taskNotFound, taskUpdateErr} = require('./taskErrorsMessages/taskErrorsMessages');

// create and save and new Note

exports.create = (req, res) => {
  if(!req.body && !req.body.content) {
    return res.status(400).send({
      message: CONTENT_EMPTY
    })
  }
  
  const history = new History({
    title: req.body.title || 'Untitled Task',
    finished: req.body.finished,
  })
  history.save()

    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

exports.findAll = (req, res) => {
  History.find()
    .then((tasks) => {
      res.send(tasks);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      })
    })
};

exports.findById = (req, res) => {
  History.findById(req.params.taskId)
    .then(history => {
      if(!history) {
        return res.status(404).send({
          message: taskNotFound(req.params.taskId),
        })
      }
      res.send(history);
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

  History.findByIdAndUpdate(req.params.taskId, {
    title: req.body.title || "Untitled Task",
    finished: req.body.finished || false,
  }, {new: true})
  .then(history => {
    if(!history) {
      return res.status(404).send({
        message: taskNotFound(req.params.taskId),
      })
    }
    res.send(history)
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

exports.findAll = (req, res) => {
  History.find()
    .then((tasks) => {
      res.send(tasks);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      })
    })
};

exports.delete = (req, res) => {
  History.findByIdAndRemove(req.params.taskId)
    .then(history => {
      if(!history) {
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
