import Eventos from'../entity/Evento.js';
import EventoRepository from '../respository/EventoRepository.js';

class EventoService{
    EventoService;
    constructor(){
        this.EventoRepository = new EventoRepository();
    }


    async createEvento(nome_evento, localizacao_evento, descricao_evento, data_evento, ID_organizacao){
        if(!nome_evento || !localizacao_evento || !descricao_evento || !data_evento ||!ID_organizacao){
            console.log(`Erro , preencha todos os campos!`);
        }else{
            try{
                const novoEvento = new Eventos(nome_evento, localizacao_evento, descricao_evento, data_evento, ID_organizacao);
                await this.EventoRepository.create(novoEvento);
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async listEventos(){
        try{
            const results = await this.EventoRepository.list();
            return results;
        }catch(error){
            console.log(`Erro : ${error.message}`);
        }
    }

    async readEvento(id_evento){
        if(!id_evento){
            console.log("Erro : Id do evento não fornecido! ");
        }else{
            try{
                const results = await this.EventoRepository.read(id_evento);
                return results;
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async updateEvento(id_evento,evento){
        if(!id_evento || !id_evento){
            console.log("Erro : id do evento ou evento não fornecido!" );
        }else{
            try{
                const results = await this.EventoRepository.update(id_evento,evento);

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async deleteEvento(id_evento){
        if(!id_evento){
            console.log("Erro : id do evento não fornecido!" );
        }else{
            try{
                const results = await this.EventoRepository.delete(id_evento);

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }
}




export default OrganizacaoService;