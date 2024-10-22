import Estrategias from '../entity/Estrategia.js';
import conection from '../database/db.js';


class EstrategiaRepository{
    async create(estrategia){
        try{
            const results = await conection.query('INSERT INTO Estrategias (titulo_estrategia, tipo_estrategia, descricao_estrategia, efetividade_estrategia) VALUES(?,?,?,?)',
            [estrategia.titulo_estrategia, estrategia.tipo_estrategia, estrategia.descricao_evento, estrategia.efetividade_estrategia]);

        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async list(){
        try{
            const results = await conection.query('SELECT * FROM Estrategias');
        
            if(results.length === 0){
                return null;
            }

            return results;

        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async read(id_estrategia){
        try{
            const results = await conection.query('SELECT * FROM Eventos WHERE ID = ? ',[id_estrategia]);
        
            const estrategia = results[0];
            if(!estrategia){
                return null;
            }else{
                return new Estrategias(estrategia.titulo_estrategia, estrategia.tipo_estrategia, estrategia.descricao_evento, estrategia.efetividade_estrategia, estrategia.ID);
            }
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async update(id_estrategia, estrategia){
        try{
            const results = await conection.query('UPDATE Estrategias SET titulo_estrategia =?, tipo_estrategia =?, descricao_estrategia =?, efetividade_estrategia =? WHERE ID = ?',
            [estrategia.titulo_estrategia, estrategia.tipo_estrategia, estrategia.descricao_evento, estrategia.efetividade_estrategia, id_estrategia]);

            if(results.affectedRows === 0){
                return null;
            }

        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }


    async delete(id_evento){
        try{
            const results = await conection.query('DELETE FROM Eventos WHERE ID = ?' ,[id_evento]);
            if(results.affectedRows === 0){
                return null;
            }
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

}






export default EstrategiaRepository;