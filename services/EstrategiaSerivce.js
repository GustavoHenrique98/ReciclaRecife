import Estrategias from'../entity/Estrategia.js';
import EstrategiaRepository from '../respository/EstrategiaRepository.js';

class EstrategiaService{
    EstrategiaRepository;
    constructor(){
        this.EstrategiaRepository = new EstrategiaRepository();
    }


    async createOrganizacao(titulo_estrategia, tipo_estrategia, descricao_estrategia, efetividade_estrategia){
        if(!titulo_estrategia || !tipo_estrategia || !descricao_estrategia || !efetividade_estrategia){
            console.log(`Erro , preencha todos os campos!`);
        }else{
            try{
                const novaEstrategia = new Estrategias(titulo_estrategia, tipo_estrategia, descricao_estrategia, efetividade_estrategia);
                await this.EstrategiaRepository.create(novaEstrategia);
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async listEstrategias(){
        try{
            const results = await this.EstrategiaRepository.list();
            return results;
        }catch(error){
            console.log(`Erro : ${error.message}`);
        }
    }

    async readOrganizacao(id_estrategia){
        if(!id_estrategia){
            console.log("Erro : Id da estratégia não fornecido! ");
        }else{
            try{
                const results = await this.EstrategiaRepository.read(id_estrategia);
                return results;
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async updateEstrategia(id_estrategia,estrategia){
        if(!id_estrategia || !estrategia){
            console.log("Erro : id da estrategia ou estrategia não fornecido!" );
        }else{
            try{
                const results = await this.EstrategiaRepository.update(id_estrategia,estrategia);

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async deleteEstrategia(id_estrategia){
        if(!id_estrategia){
            console.log("Erro : id da estrategia não fornecido!" );
        }else{
            try{
                const results = await this.EstrategiaRepository.delete(id_estrategia);

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }
}




export default OrganizacaoService;