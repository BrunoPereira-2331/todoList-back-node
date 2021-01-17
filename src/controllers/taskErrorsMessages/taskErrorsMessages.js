const CONTENT_EMPTY = "Task title can not be empty";

const taskCreateErr = (taskId) => `Error creating task, id:${taskId}`;
const taskUpdateErr = (taskId) => `Error updating task, id:${taskId}`;

const taskNotFound = (taskId) => `Task not found, id:${taskId}`;

module.exports = {
  CONTENT_EMPTY,
  taskCreateErr,
  taskUpdateErr,
  taskNotFound,
}