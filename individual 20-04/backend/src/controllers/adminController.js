// Importa o bd.js para poder usar o banco de dados simulado
import AdminDAO from "../DAO/AdminDAO.js"
import Admin from "../models/Admin.js"

class adminController {
    static rotas(app){
        // Rota para o recurso Admin
        app.get("/admin", adminController.listar)
        app.post("/admin", adminController.inserir)
        app.get("/admin/:email", adminController.filtrarPoremail)
        app.delete("/admin/:email", adminController.apagarAdmin)
        app.put("/admin/id/:id", adminController.atualizaradmin)
    }
    
    // GET -- Listar todos os Administradores
    static async listar(req, res){
        const resultado = await AdminDAO.listar()
        res.send(resultado)
  
    }
    
    // POST  --  Criar um novo Administrador
    static async inserir(req, res) {
        const admin = {
            nome: req.body.nome,
            sobrenome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }

        if (!admin || !admin.nome || !admin.sobrenome || !admin.email || !admin.senha) {
            res.status(400).send("Precisa passar as informações")
            return
        }


        const result = await AdminDAO.inserir(admin)


        if (result.erro) {
            res.status(500).send(result)
        }

        res.status(201).send({ "Mensagem": "Administrador criado com sucesso", "Novo administrador: ": admin })
    }

    // GET -- BUSCAR POR ID
    static async filtrarPoremail(req, res){
        const admin = await AdminDAO.buscarPorEmail(req.params.email)

        if (!admin) {

            res.status(404).send("Administrador não encontrado")
        }

        res.status(200).send(admin)      
    }
    
    // DELETE -- Deletar um Administrador pelo email
    static async apagarAdmin(req, res){
       const admin = await AdminDAO.buscarPorEmail(req.params.email)

       if(!admin){
           res.status(404).send("Administrador não encontrado")
           return
       }

       const result = await AdminDAO.deletar(req.params.email)

       if(result.erro){
            res.status(400).send({ 'Mensagem': 'Administrador não deletado' })
            return
       }

       res.status(200).send(result)
    }

    // PUT -- Atualizar um usuário
    static async atualizaradmin(req, res) {
        const id = await AdminDAO.buscarPorID(req.params.id)
        if (!id) {
            res.status(404).send('admin não encontrado')
            return
        }

        const admin = new Admin(req.body.nome, req.body.sobrenome, req.body.email, req.body.senha)

        if (!admin || !admin.nome || !admin.sobrenome || !admin.email || !admin.senha) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }

        if (!Object.keys(admin).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }

        const result = await AdminDAO.atualizar(req.params.id, admin)

        if (result.erro) {
            res.status(500).send('Erro ao atualizar o Administrador')
            return
        }

        res.status(200).send({ "Mensagem": "Dados atualizados", "Administrador: ": admin })

    }      
}

export default adminController