const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContaCorrente = require('./contaCorrente.js');

const ClienteSchema = new Schema({
    nome: 
    {
        type: String,
        immutable: true,
    },
    cpf: 
    {
        type: String,
        immutable: true,
        unique: true,
    },
    endereco: String,
    email: String,
    telefone: String,
    limiteCredito: String,
    contaCorrente:
    {
        type: Schema.Types.ObjectId,
        ref: 'ContaCorrente',
        immutable: true,
    }
});

ClienteSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await ContaCorrente.deleteOne({
            _id: {
                $in: doc.contaCorrente
            }
        })
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
