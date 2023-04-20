import './Formulario.css'
import { useState } from 'react'


const Formulario = () => {
    //criando uma função que estabelece que os campos vazios iniciam vazios.
    const [form, SetForm] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    })

    const [emptyValues, SetEmptyValue] = useState(false);

    //criando uma variável que "assiste" cada mudança nos campos.
    const handleChange = (e) => {
        let newProp = form;
        newProp[e.target.name] = [e.target.value];
        SetForm({ ...newProp })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //Verificando se existem campos não preenchidos
        let emptyValues = Object.values(form).some(obj => obj == "");
        SetEmptyValue(emptyValues)

    }

    /*função para verificar, ao preencher o formulário, se todos os campos
    foram preenchidos. só será possível enviar a mensagem no caso de nenhum
    campo estar em branco.*/
    function enviarMensagem() {
        if (
            form["nome"] != "",
            form["sobrenome"] != "",
            form["email"] != "",
            form["senha"] != ""
        ) {

            alert("Solicitação enviada! Dentro de 2 dias úteis entraremos em contato.")
        }

    }

    return (

        <div className="divPrincipal">
            <div className='ctt-txt'><h1 className='titulo-contato'>Criar Admin</h1></div>
            <form className="form-completo" id="form" onSubmit={(e) => { handleSubmit(e) }}>
                <div className="form1">
                    <label className="nome">Nome</label>
                    <input type="text" placeholder="Nome" name="nome" className='input' onBlur={(e) => handleChange(e)} />
                    {emptyValues && form["nome"] == "" ? <span className="emptyText">!</span> : ""}
                    <label className="whatsapp">Sobrenome</label>
                    <input type="text" placeholder="Sobrenome" name="sobrenome" className='input' onBlur={(e) => handleChange(e)} />
                    {emptyValues && form["sobrenome"] == "" ? <span className="emptyText">!</span> : ""}
                    <label>Email</label>
                    <input type="text" placeholder="Email" name="email" className='input' onBlur={(e) => handleChange(e)}></input>
                    {emptyValues && form["email"] == "" ? <span className="emptyText">!</span> : ""}
                    <label className="senha">Senha</label>
                    <input type="text" placeholder="*********" name="senha" className='input' onBlur={(e) => handleChange(e)}></input>
                    {emptyValues && form["senha"] == "" ? <span className="emptyText">!</span> : ""}
                    <button className="btn">Enviar</button>
                    {enviarMensagem()}
                </div>
            </form>
        </div>
    )
}


export default Formulario
