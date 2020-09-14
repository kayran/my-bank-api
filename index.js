const express = require('express')

const routes = require('./handlers/router');

const app = express()
app.use(express.json())

app.use('/', routes);

const port = 6161;
app.listen(port, () => {
  console.log(`My bank api listening at http://localhost:${port}`);
  console.log('Press Ctrl+C to quit.');
});