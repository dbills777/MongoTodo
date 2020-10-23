const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./todoModel');
const Cat = require('./categoryModel');
const app = express();
const port = 3000;
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://dblist:dblist123@todoslist.nqodb.mongodb.net/todoslist?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) =>
    app.listen(process.env.PORT || port, () =>
      console.log(`"Static Todo App Listening at http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));

app.post('/addtodo', (req, res) => {
  console.log(req.query.todo);
  Todo.create(
    {
      todo: req.query.todo,
      complete: false,
      cat: req.query.cat,
      
    },
    Cat.create({
      name: req.query.cat,
    }),
    (err, todos) => {
      if (err) {
        console.log(err);
      }
      Todo.find((err, todos) => {
        if (err) {
          console.log(err);
        }
        res.json(todos);
      });
    }
  );
});

app.get('/alltodos', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  Todo.find((err, todo) => {
    if (err) {
      console.log(err);
    }
    res.json(todo);
  });
});

