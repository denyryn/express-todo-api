var express = require("express");
var router = express.Router();
var todoController = require("../controller/todoController");

/* GET users listing. */
router.get("/", todoController.getAll);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.get("/:id", todoController.getTodoById);

module.exports = router;
