const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { urlencoded } = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'))

var tarefas = ['Arrumar quarto', 'Compras super mercado'];

app.post('/', (req, res)=>{
    tarefas.push(req.body.tarefa);
    res.render('index', { tarefasList: tarefas });
});

app.get('/',(req, res)=>{
    res.render('index',{tarefasList: tarefas});
});

app.get('/deletar/:id', (req, res)=>{
    tarefas.splice(req.params.id, 1);
    res.render('index', { tarefasList: tarefas });
});

app.listen(5000, ()=>{
    console.log('Serve rodando')
})