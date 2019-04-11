const multer = require('multer');
const path = require('path');
const crypto = require('crypto');       //serve para gerar conjunto de caracteres unicos (hash)

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),   //caminho onde os arquivos serão salvos
    //método de armazenamento dos arquivos
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        //determina o nome de como o arquivo ficara salvo dentro do projeto
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=> {
                if (err) cb(err);

                file.key = `${hash.toString('hex')} - ${file.originalname}`;

                cb(null, file.key);
            })  
        } 
    })
};