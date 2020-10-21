const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

const port = 3000;

app.use(express.static('public'));
app.listen(process.env.PORT || port, () =>
  console.log(`"Static Todo App Listening at http://localhost:${port}`)
);
