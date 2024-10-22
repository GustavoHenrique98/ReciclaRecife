import { getDOM, getDomAll } from "./getDOM.js";
const formLogin = {
    loginForm :getDOM('#loginForm'),
    Log_cnpj :getDOM('#Log_cnpj'),
    Log_password:getDOM('#Log_password'),
    Log_btn:getDOM('#log_btn')
}



formLogin.loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const log_cnpj = formLogin.Log_cnpj;
    const log_password = formLogin.Log_password;
    axios.get('http://localhost:3000/organizacao/busca')
    .then(response=>{
        if(response.status === 200){
            return response.data
        }
    }).then(dados =>{
        // Construir depois o código para verificação da página.
    })
});