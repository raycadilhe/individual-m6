import './Formulario.css'
import { useState } from 'react'
import Axios from 'axios'


const Formulario = () => {
    const [values, setValues] = useState();
    const [listarAdm, setListarAdm] = useState();

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    const handleClickButton = () => {
        Axios.post("http://localhost:3000/admin", {
            nome: values.nome,
            sobrenome: values.sobrenome,
            email: values.email,
            senha: values.senha
        }).then((response) => {
            console.log(response)
        })
    };

   useEffect (() => {
        Axios.get("http://localhost:3000/admin").then((response) => {
            setListarAdm(response.data);
        });
    }, []);
    

    //criando uma função que estabelece que os campos vazios iniciam vazios.
    const [form, SetForm] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    })


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

            alert("Admin criado com sucesso.")
        }

    }

    return (

        <div className="divPrincipal">
            <div className='ctt-txt'><h1 className='titulo-contato'>Criar Admin</h1></div>
            <form className="form-completo" id="form">
                <div className="form1">
                    <label className="nome">Nome</label>
                    <input type="text" placeholder="Nome" name="nome" className='input' onChange={handleChangeValues} />
                    <label className="sobrenome">Sobrenome</label>
                    <input type="text" placeholder="Sobrenome" name="sobrenome" className='input' onChange={handleChangeValues} />
                    <label>Email</label>
                    <input type="text" placeholder="Email" name="email" className='input' onChange={handleChangeValues}></input>
                    <label className="senha">Senha</label>
                    <input type="text" placeholder="*********" name="senha" className='input' onChange={handleChangeValues}></input>
                    <button className="btn" onClick={() => handleClickButton()}>Enviar</button>
                    {enviarMensagem()}
                </div>
            </form>
        </div>
    )

    }

export default Formulario
