const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    const usuarios = await Usuario.find({_ID: {$ne: req.uid}})
            .sort('-online')
            .skip(desde)
            .limit(10);
    return res.json(usuarios);
}

module.exports = {
    getUsuarios,
}