//Arquivo principal da aplicação
//Serve para startar o servidor
const express = require('express'); //comando require acessa uma dependencia dessa aplicação
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());    //define que qualquer um pode acessar a aplicação web

const server = require('http').Server(app);     //protocolo padrão node
const io = require('socket.io')(server);
//Aplicação está pronta para ouvir tanto http quando webSocket
//Mudança na linha 26

io.on("connection", socket =>{
    //cria-se salas para que nao ocorra o conflito entre diferentes boxes
    //Isola o usuário em uma "sala" especifica
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
}); 

//conexão com o mongodb Atlas (link se pega no site)
mongoose.connect('mongodb+srv://felipe:felipe@cluster0-888gk.mongodb.net/test?retryWrites=true', 
{
    useNewUrlParser: true
});

//Uma forma de seguir com o código em si
//a aplicação não para aqui ela segue até acabar as requisições
app.use((req, res, next) => {
    req.io = io;

    return next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//quando receber uma requisição na rota /file
//serve para mostrar o arquivo em si (no navegador)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

//define qual será a porta automaticamente
//se o ambiente fornecer, senão se usa a 3333
server.listen(process.env.PORT ||  3333);