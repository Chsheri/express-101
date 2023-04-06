const useDb = require("../lib/useDb");
const todos = new useDb();

const createTodo = (req, res) => {
  // Whenever a request is received, the given object should be type/fact checked and if all checks are fine, it should be added to the database
  // If an object is added to the database, return the added object's name or id in the response

  if (!req.body.name) {
    return res.status(403).send({
      msg: "The provided object should contain the name property",
      err: "FORBIDDEN",
    });
  }

  const allData = todos.getAll();
  const found = allData.find((item) => item.name === req.body.name);

  if (found) {
    return res.status(403).send({
      msg: `Your provided object already exists in database with id: ${found.id}`,
      err: "FORBIDDEN",
    });
  }

  const added = todos.addEntry({ ...req.body });

  return res.status(200).send({
    msg: `Your object with id: ${added} has been added to the database`,
    data: added,
  });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;

  const found = todos.findEntry(id);

  if (found.err) {
    return res.status(403).send({
      msg: "Your provided id doesn't exist in database",
      err: found.err,
    });
  }

  const deleted = todos.deleteEntry(id);

  if (deleted.length > 0) {
    return res.status(200).send({
      msg: `The item with id: ${deleted.id} has been deleted from the database`,
      data: deleted,
    });
  }

  return res
    .send(400)
    .send({ msg: "Something went wrong on the server", err: "BACKENDERR" });
};

const getAllTodos = (req, res) => {
  // Whenever we get a simple request, we send back everything that exists within the database instance

  try {
    const allItems = todos.getAll();
    if (allItems.length < 1) {
      return res
        .status(404)
        .send({ msg: "Nothing found inside the database", err: "NOTFOUND" });
    }
    return res.status(200).send({
      msg: `A total of ${allItems.length} entries exist in the database`,
      data: allItems,
    });
  } catch (error) {
    console.log(error);
  }
};

const findTodo = (req, res) => {
  const found = todos.findEntry(req.params.id);

  if (found.err) {
    return res.status(404).send({
      msg: `Your provided id: ${req.params.id} doesn't exist in database`,
      err: found?.err,
    });
  }

  return res.status(200).send({
    msg: `Your required item with id: ${found.id} in the database`,
    data: found,
  });
};

const updateTodo = (req, res) => {
  return;
};

module.exports = { createTodo, deleteTodo, getAllTodos, findTodo, updateTodo };
