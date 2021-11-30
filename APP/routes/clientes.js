const express = require('express');
const router = express.Router();
const clientes = require('../controllers/clientes');
const catchAsync = require('../util/catchAsync');

router.route('/')
    .get(catchAsync(clientes.index))
    .post(catchAsync(clientes.createCliente));


router.get('/new', catchAsync(clientes.renderNewForm));

router.route('/:id')
    .patch(catchAsync(clientes.updateCliente))
    .delete(catchAsync(clientes.deleteCliente));

router.get('/:id/edit', catchAsync(clientes.renderEditForm));

module.exports = router;