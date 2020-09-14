const express = require('express')

const routes = require('./handlers/router');

const app = express()
app.use(express.json())

app.use('/', routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`My bank api listening at http://localhost:${port}`);
  console.log('Press Ctrl+C to quit.');
});