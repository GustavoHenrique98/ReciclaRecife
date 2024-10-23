import express from 'express';
import EventoService from '../services/EventoService.js';

const evService = new EventoService();
const Router = express.Router();

Router.post('/insert', async(req,res)=>{
    const post_data = req.body;
    const {nome_evento, localizacao_evento, descricao_evento, data_evento, ID_organizacao} = post_data;

    if(Object.keys(post_data).length===0){
        res.status(422).send('Erro : Corpo da requisição vazio!');
        return;
    }

    if(!nome_evento || !localizacao_evento || !descricao_evento || !data_evento || !ID_organizacao){
        res.status(422).send('Erro! Dados incompletos preencha todos os campos! ');
        return;
    }

    try{
        await evService.createEvento(nome_evento, localizacao_evento, descricao_evento, data_evento, ID_organizacao);
        res.send('Novo evento cadastrado com sucesso!!!');
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});

Router.get('/list', async(req,res)=>{
    try{
        const results = await evService.listEventos();
        res.send(results);
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});

Router.get('/list/:id_evento', async(req,res)=>{
    const id_evento = req.params.id_evento;
    try{
        const results = await evService.readEvento(id_evento);
        if(results === null){
            res.status(404).send('Erro : Evento não encontrado!');
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});


Router.update('update/:id_evento', async(req,res)=>{
    const update_data = req.body;
    const id_evento = req.params.id_evento;
    const{ nome_evento, localizacao_evento, descricao_evento, data_evento, ID_organizacao} = update_data;
    

    if(Object.keys(update).length === 0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }
    
    try{
        const evento = await evService.updateEvento(id_evento);

        if(evento === null){
            res.status(404).send('Error ! ID da organização inválido!');
        }else{
            const eventoUpdated = {...evento};
            
            if(nome_evento){
                eventoUpdated.nome_evento = nome_evento;
            }

            if(localizacao_evento){
                eventoUpdated.localizacao_evento = localizacao_evento;
            }

            if(descricao_evento){
                eventoUpdated.descricao_evento = descricao_evento;
            }

            if(data_evento){
                eventoUpdated.data_evento = data_evento;
            }

            if(ID_organizacao){
                eventoUpdated.ID_organizacao = ID_organizacao;
            }

            await evService.updateEvento(id_evento,eventoUpdated);

            res.send('Evento atualizado com sucesso!');
        }
        
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});



Router.delete('/delete/:id_evento', async(req,res)=>{
    const id_evento = req.params.id_evento;
    
    try{
        const results = await evService.deleteEvento(id_evento);
        if(results === null){
            res.status(404).send('Erro : ID do evento inválido!');
        }else{
            res.send('Evento deletado com sucesso!');
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});

export default Router;