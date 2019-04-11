//percore as pastas para encontrar o Box no models
const Box = require('../models/Box');

class BoxController{
    //permite que o usuario crie novas pastas para a aplicação (novos boxes)
    async store(req, res) {
        //req.body vai pegar apenas o title, que é a unica info que se tem no momento
        const box = await Box.create(req.body);
    
        return res.json(box);
    }

    //Mostra todos os arquivos que estão em uma box
    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            //para ordenar os arquivos do mais recente para o mais antigo
            path: 'files',
            //-1: decresente
            // 1: crescente
            options: { sort: { createAt: -1 } }
            
        });

        return res.json(box);
    }

}

module.exports = new BoxController();
