# Basic Todo App Backend Server

**link is also included in the about section on this page**

The frontend app must be in vanilla Javascript. No frameworks or libraries. (ie. React, Vue, Jquery)

The backend server can use Express or other NodeJS frameworks.

The third part of this app is to add the backend. Create a server that connects to a database to store your data.

At this point you can remove the local storage and the provided initial todo objects.


# Your Todo App Backend server must fulfill the following requirements:

- The data (todos) must be stored in a database (MongoDB)

### The frontend app must use your new server to save and retrieve todos via an API.


### You may choose the design of your backend. The following are some ideas to explore, but is not exhaustive.

- ### One server to host the app and the API (Both Hosted Via Heroku)

# Documentation:
- ### All application files are included in this project. The Front end functionality is included and served in the public folder. 
  - Apllication serves front end files from the public folder.
  - Application is hosted with Heroko.
  - MongoDB Database.
- ### To run the application Locally.
  - "npm install"
  - change url in public/js/index.js to localhost:3000 or your prefered port
  - database endpoints are included in the app.js file
  - Post request example endopoint:
``` javascript
app.post('/addtodo', (req, res) => {
  console.log(req.body);
  Todo.create(
    {
      todo: req.body.todo,
      complete: false,
      cat: req.body.cat,      
    },
    
    (err, todos) => {
      if (err) {
        console.log(err);
      }
      Todo.find((err, todos) => {
        if (err) {
          console.log(err);
        }
        res.json(todos)
      });
    }
  );
});
```
- delete all completed example endpoint
``` javascript
app.delete('/delete', (req, res) => {
  const query = { complete: true };

  Todo
    .deleteMany(query)
    .then((res) => res.json(todo))
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});
```
- toggle complete status
``` javascript
app.put('/todo/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id,{new: true}, (err, todo) => {
    todo.complete = !todo.complete
    todo.save()
    console.log(todo)
    
    Todo.updateOne(req.query, (err, todo) => {
      console.log(todo)

      console.log(req.params)
      if (err) {
        console.log(err);
      }
      Todo.find((err, todo) => {
        if (err) {
          console.log(err);
        }
        res.json(todo);
      });
    });
  });
});
```

