//Responsável pelo arquivo em si
//Aqui será configurado a tabela do arquivo e quais
//serão as informações que ele irá conter
const mongoose = require('mongoose');

//Equivale a uma tabela no banco de dados (mongodb)
const File = new mongoose.Schema({
    //passa como parametro os campos que serao armazenados dentro dele
        title: {
            //Significa que é um campo obrigatorio e sempre será preenchido
            type: String,
            required: true,
        },
            //Armazena o nome do arquivo fisico
        path: {
            type: String,
            required: true,
        }
    }, 
    {
        //cria um campo criado em: e atualizado em:
        timestamps: true,
        //automatiza os calculos das virtuals criadas (linha 33)
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

//Um campo virtual existe apenas no lado do backend, e não
//no banco de dados

File.virtual('url').get(function(){
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});



module.exports = mongoose.model('File', File);