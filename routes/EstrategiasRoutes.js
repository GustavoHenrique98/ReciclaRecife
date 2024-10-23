import express from 'express';
import EstrategiaService from '../services/EstrategiaService.js';

const estService = new EstrategiaService();
const Router = express.Router();

Router.post('/insert', async(req,res)=>{
    const post_data = req.body;
    const {titulo_estrategia, tipo_estrategia, descricao_estrategia, efetividade_estrategia} = post_data;

    if(Object.keys(post_data).length===0){
        res.status(422).send('Erro : Corpo da requisição vazio!');
        return;
    }

    if(!titulo_estrategia || !tipo_estrategia || !descricao_estrategia || !efetividade_estrategia ){
        res.status(422).send('Erro! Dados incompletos preencha todos os campos! ');
        return;
    }

    try{
        await estService.createEstrategia(titulo_estrategia, tipo_estrategia, descricao_estrategia, efetividade_estrategia);
        res.send('Nova estratégia cadastrada com sucesso!!!');
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});

Router.get('/list', async(req,res)=>{
    try{
        const results = await estService.listEstrategias();
        res.send(results);
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});


Router.get('/list/:id_estrategia', async(req,res)=>{
    const id_estrategia = req.params.id_estrategia;
    try{
        const results = await estService.readEstrategia(id_estrategia);
        if(results === null){
            res.status(404).send('Erro : Estratégia não encontrada!');
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});


Router.update('update/:id_estrategia', async(req,res)=>{
    const update_data = req.body;
    const id_estrategia = req.params.id_estrategia;
    const{titulo_estrategia, tipo_estrategia, descricao_estrategia, efetividade_estrategia} = update_data;
    

    if(Object.keys(update).length === 0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }
    
    try{
        const estrategia = await estService.readEstrategia(id_estrategia);

        if(estrategia === null){
            res.status(404).send('Error ! ID da estratégia inválido!');
        }else{
            const eventoUpdated = {...evento};
            
            if(titulo_estrategia){
                eventoUpdated.nome_evento = nome_evento;
            }

            if(tipo_estrategia){
                eventoUpdated.localizacao_evento = localizacao_evento;
            }

            if(descricao_estrategia){
                eventoUpdated.descricao_evento = descricao_evento;
            }

            if(efetividade_estrategia){
                eventoUpdated.data_evento = data_evento;
            }

            await estService.updateEstrategia(id_estrategia,eventoUpdated);

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




export default router;