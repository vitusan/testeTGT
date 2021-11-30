
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contaCorrenteSchema = new Schema({
    numero: Number,
    agencia: Number,
});

module.exports = mongoose.model("ContaCorrente", contaCorrenteSchema);