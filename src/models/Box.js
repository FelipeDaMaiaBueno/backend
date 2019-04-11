//Arquivo dos schemas do mongodb
//Essa primeira parte é responsavel pela criação das
//boxes onde ficaram guardados os arquivos
const mongoose = require('mongoose');

//Equivale a uma tabela no banco de dados (mongodb)
const Box = new mongoose.Schema({
    //passa como parametro os campos que serao armazenados dentro dele
    title: {
        //Significa que é um campo obrigatorio e sempre será preenchido
        type: String,
        required: true,
    },
    //Lista dos arquivos que estaram na Box (caixa de arquivos), é um vetor
    files: [
    //Vai ser definido que o array de files será um array de model file (arquivo File.js)
        {type: mongoose.Schema.Types.ObjectId, ref: "File"}
    ]
}, {
    //cria um campo criado em: e atualizado em:
    timestamps: true
});

module.exports = mongoose.model('Box', Box);