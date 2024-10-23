import express from 'express';
import OrganizacaoService from '../services/OrganizacaoService.js';
const orgService = new OrganizacaoService();
const Router = express.Router();


Router.post('/insert',async(req,res)=>{
    const post_data = req.body;
    const{ cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao} = post_data;

    if(Object.keys(post_data).length ===0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }

    if(!cnpj || !nome_fantasia || !email || !password || !porte || !telefone || !localizacao_organizacao || !responsavel_organizacao){
        res.status(422).send('Erro! Dados incompletos preencha todos os campos! ');
        return;
    }

    try{
        await orgService.createOrganizacao(cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao);
        res.send('Organização cadastrada com sucesso!');
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }


});



Router.post('/authOrg',async(req,res)=>{
    const post_data = req.body;
    const{ cnpj, password} = post_data;

    if(Object.keys(post_data).length ===0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }

    if(!cnpj || !password){
        res.status(422).send('Erro! Dados incompletos preencha todos os campos! ');
        return;
    }

    try{
       const organizacoes = await orgService.listOrganizacoes();
       let validarOrg = false;
       for (let i = 0; i < organizacoes.length; i++) {
            if(cnpj === organizacoes[i].cnpj && password === organizacoes[i].password){
                res.send('Organizacação autenticada com sucesso!');
                validarOrg = true;
                break;
            }
        
       }

       if(validarOrg === false){
            res.status(404).send('Erro : Organização não encontrada na base de dados!');
       }else{
            res.send('Organização cadastrada com sucesso!');
       }
       
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }


});


Router.get('/list', async(req,res)=>{
    try{
        const results = await orgService.listOrganizacoes();
        res.send(results);
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});



Router.get('/list/:id_organizacao', async(req,res)=>{
    const id_organizacao = req.params.id_organizacao;
    try{
        const results = await orgService.readOrganizacao(id_organizacao);
        if(results === null){
            res.status(404).send('Erro : Organização não encontrada!');
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});


Router.update('update/:id', async(req,res)=>{
    const update_data = req.body;
    const id_organizacao = req.params.id_organizacao;
    const{ cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao} = update_data;
    

    if(Object.keys(update).length ===0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }
    
    try{
        const organizacao = await orgService.readOrganizacao(id_organizacao);

        if(organizacao === null){
            res.status(404).send('Error ! ID da organização inválido!');
        }else{
            const organizacaoUpdated = {...organizacao};
            
            if(cnpj){
                organizacaoUpdated.cnpj = cnpj;
            }
            if(nome_fantasia){
                organizacaoUpdated.nome_fantasia = nome_fantasia;
            }
            if(email){
                organizacaoUpdated.email = email;
                
            }
            if(password){
                organizacaoUpdated.password;
            }
            if(porte){
                organizacaoUpdated.porte = porte;
            }
            if(telefone){
                organizacaoUpdated.telefone = telefone;
            }
            if(localizacao_organizacao){
                organizacaoUpdated.localizacao_organizacao = localizacao_organizacao;
            }
            if(responsavel_organizacao){
                organizacaoUpdated.responsavel_organizacao = responsavel_organizacao;
            }

            await orgService.updateOrganizacao(id_organizacao,organizacaoUpdated);

            res.send('Organização atualizada com sucesso!');
        }
        
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});



Router.delete('/delete/:id_organizacao', async(req,res)=>{
    const update_data = req.body;
    const id_organizacao = req.params.id_organizacao;
    
    try{
        const results = await orgService.deleteOrganizacao(id_organizacao);
        if(results === null){
            res.status(404).send('Erro : ID da organização inválido!');
        }else{
            res.send('Organização deletada com sucesso!');
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});













export default Router;