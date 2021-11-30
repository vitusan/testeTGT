const Cliente = require('../models/cliente');
const Conta = require('../models/contaCorrente');
const axios = require('axios').default;

module.exports.index = async (req, res) => {
    const clientes = await Cliente.find({}).populate({ path: 'contaCorrente' });
    res.render('clientes/index', { clientes })
}

module.exports.createCliente = async (req, res) => {
    const cliente = new Cliente(req.body.cliente);
    const data = JSON.stringify({
        "nome": cliente.nome,
        "cpf": cliente.cpf,
        "endereco": cliente.endereco,
        "email": cliente.email,
        "telefone": cliente.telefone,
        "limiteCredito": parseFloat(cliente.limiteCredito)
    });
    const config = {
        method: 'post',
        url: 'https://bacen-openbanking-api.herokuapp.com/openbanking/cidadao',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    await axios(config);
    const conta = new Conta({ numero: Math.floor(Math.random() * 10000), agencia: 0001 });
    cliente.contaCorrente = conta;
    await cliente.save();
    await conta.save();
    res.redirect('/clientes/');
}

module.exports.renderNewForm = async (req, res) => {
    if (await (await Cliente.find({ cpf: req.query.cpf })).length > 0) {
        console.log(true);
        throw new Error('Cliente já cadastrado!');
    }
    const clienteOpenBanking = await axios.get(`https://bacen-openbanking-api.herokuapp.com/openbanking/cidadao/${req.query.cpf}`, {
        validateStatus: function (status) {
            return status < 300 || status === 404;
        }
    });
    res.render('clientes/new', { clienteOpenBanking: clienteOpenBanking.data, status: clienteOpenBanking.status, cpf: req.query.cpf });
}

module.exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, { ...req.body.cliente });
    var data = JSON.stringify({
        "endereco": req.body.cliente.endereco,
        "email": req.body.cliente.email,
        "telefone": req.body.cliente.telefone,
        "limiteCredito": parseFloat(req.body.cliente.limiteCredito)
    });
    var config = {
        method: 'patch',
        url: `https://bacen-openbanking-api.herokuapp.com/openbanking/cidadao/${cliente.cpf}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    axios(config)
    res.redirect('/clientes/');
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render('clientes/edit', { cliente });
}

module.exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.redirect('/clientes/');
}