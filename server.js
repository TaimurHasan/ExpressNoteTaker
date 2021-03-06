const express = require('express');
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// instantiate express for use in server side programming
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));

// parse incoming JSON data
app.use(express.json());

// ensure files looked up relative to static directory
app.use(express.static('public'));

// routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}!`);
})