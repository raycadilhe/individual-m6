import db from "../infra/db.js";

class AdminDAO {

    // GET -- Listar todos os Administradores
    static listar() {
        const query = "SELECT * FROM ADMIN"
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }
     
    // POST  --  Criar um novo Administrador
    static inserir(admin){
         const query = `INSERT INTO ADMIN (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)`;

         return new Promise((resolve, reject) => {
             db.run(query, [admin.nome, admin.sobrenome, admin.email, admin.senha], (err) =>{
                if (err){
                     reject({
                        mensagem: "Erro ao inserir o Administrador",
                        error:err,
                   });
               }
              resolve(admin);
           });
       });
    }
    
    // GET -- BUSCAR POR EMAIL
    static buscarPorEmail(email) {
        const query = "SELECT * FROM ADMIN WHERE email = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [email], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

    static buscarPorID(id) {
        const query = "SELECT * FROM ADMIN WHERE id = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

  // PUT  --  
  static atualizar(id, admin){
    const query =
    "UPDATE ADMIN SET nome = ?, sobrenome = ? , email = ?, senha = ? WHERE id = ?";
    return new Promise((resolve, reject) =>{
      db.run(
        query,
        [admin.nome, admin.sobrenome, admin.email, admin.senha, id],
        (err)=>{
          if (err){
            reject({
              mensagem: "Erro ao atualizar o Administrador",
              erro: err,
            });
          }
          resolve({
            mensagem: "Administrador atualizado com sucesso"
          });
        }
      );


    });
  }   

    // DELETE -- Deletar um Administrador pelo Email
    static deletar(email){
        const query = "DELETE FROM ADMIN WHERE email = ?";
        return new Promise((resolve,reject) =>{
          db.run(query, [email], (err) =>{
            if(err){
              reject({
                mensagem: "Erro ao deletar o seu Administrador",
                erro: err,
              });
            }
            resolve({mensagem: "Administrador deletado com sucesso", email: email});
          });
        });
      }   
}

export default AdminDAO