const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(5000, () => {
    console.log('Server run on port 5000');
});
