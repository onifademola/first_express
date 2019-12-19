const express = require('express');
const router = express.Router();
const Joi = require('joi');


const genres = [
    {id:1, name: 'Juju'},
    {id:2, name: 'Apala'},
    {id:3, name: 'Reggae'},
    {id:4, name: 'High Life'},
    {id:5, name: 'Fuji'},
    {id:6, name: 'Pop'}
];

router.get('/', (req, res) => {
    res.send(genres);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
};

router.get('/:id', (req, res) => {
    if(typeof req.params.id === undefined) return res.status(500).send('Not a valid ID');
    const paramId = parseInt(req.params.id);
    if(!paramId) return res.status(500).send('Not a valid ID');
    const genre = genres.find(c => c.id === paramId);
    if (!genre) return res.status(404).send(`Genre with id ${id} was not found!`);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with id: ${id} was not found !`);

    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    name = req.body.name;
    res.send(genre);
});

module.exports = router;