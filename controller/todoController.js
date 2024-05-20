const { Todo } = require("../models/index");
exports.getAll = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createTodo = async (req, res, next) => {
  const { task, createdDate, percentCompleted, isCompleted } = req.body;
  try {
    const newTodo = await Todo.create({
      task,
      createdDate,
      percentCompleted,
      isCompleted,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTodoById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTodo = async (req, res, next) => {
  const id = req.params.id;
  const { task, createdDate, percentCompleted, isCompleted } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      todo.task = task;
      todo.createdDate = createdDate;
      todo.percentCompleted = percentCompleted;
      todo.isCompleted = isCompleted;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
