const Joi = require('joi');
const express = require ('express');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);

app.get('/', (req, res) =>{
    res.send('Hello Heavens oo!!')
});

const genres = [
    {id:1, name: 'Juju'},
    {id:2, name: 'Apala'},
    {id:3, name: 'Reggae'},
    {id:4, name: 'High Life'},
    {id:5, name: 'Fuji'},
    {id:6, name: 'Pop'}
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
};

app.get('/api/genres/:id', (req, res) => {
    if(typeof req.params.id === undefined) return res.status(500).send('Not a valid ID');
    const paramId = parseInt(req.params.id);
    if(!paramId) return res.status(500).send('Not a valid ID');
    const genre = genres.find(c => c.id === paramId);
    if (!genre) return res.status(404).send(`Genre with id ${id} was not found!`);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with id: ${id} was not found !`);

    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    name = req.body.name;
    res.send(genre);
});

const port = process.env.PORT || 3001;
app.listen(port);