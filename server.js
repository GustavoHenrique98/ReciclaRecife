//Dependencias
import express from "express";
import cors from 'cors';
import morgan from "morgan";

//Rotas a partir do router
import Organizacao from "./routes/Organizacao.js";
import Estrategias from "./routes/Estrategias.js";
import Eventos from "./routes/Eventos.js";
import Paginas from "./routes/paginas.js";

const app = express();
const API_AVAILABLE = true;

//Checando se a API está disponível
app.use((req,res,next)=>{
    if(API_AVAILABLE){
        next();
    }else{
        res.send('API em manutenção! Tente novamente mais tarde!');
    }
});

//Middlewares
app.use(cors());
app.use(morgan('URL: :url | Método: :method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Utilizando as rotas.
app.use('/' , Paginas);
app.use('/organizacao' , Organizacao);
app.use('/estrategias' , Estrategias);
app.use('/eventos' , Eventos);

//Caso a requisição seja para uma rota que não existe.
app.use((req,res)=>{
    res.status(404).send("<h1>ERRO 404! Rota não encontrada!!!</h1>");
});


app.listen(3000,()=>{
    console.log('Servidor rodando em http://localhost:3000');
});