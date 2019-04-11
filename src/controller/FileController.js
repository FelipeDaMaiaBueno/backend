//percore as pastas para encontrar o File no models
const File = require("../models/File");
const Box = require("../models/Box");

class FileController{
    //permite que o usuario crie novas pastas para a aplicação (novos boxes)
    async store(req, res) {
        //req.params -> retorna os parametros que vem atraves de rotas e o id que é parametro que foi colocado na rota
        const box = await Box.findById(req.params.id);

        //criação do arquivo
        const file = await File.create({
            title: req.file.originalname, 
            path: req.file.key
        });

        //como no Box.js é um array de arquivos
        //se usa push para incluir uma nova info nele
        box.files.push(file);

        await box.save();
        
        req.io.sockets.in(box._id).emit('file', file);

        // Criar um arquivo
        //retorna o arquivo que acabou de ser criado (linha 12)
        return res.json(file); 
    }
}

module.exports = new FileController();
