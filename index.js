const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const express = require ('express');
const genres = require('./routes/genres');
const logger = require('./logger');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`App: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use('/api/genres', genres);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan is enabled...')
}

app.get('/', (req, res) =>{
    res.send('Hello Heavens oo!!')
});

const port = process.env.PORT || 3001;
app.listen(port);