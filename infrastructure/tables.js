class Tables{
    init(connection){
        this.connection = connection
        this.criarAtendimentos()
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (Id int NOT NULL AUTO_INCREMENT, Client VARCHAR(50) NOT NULL, Pet VARCHAR(20), Servico VARCHAR(20) NOT NULL, Data DATETIME NOT NULL, DataCriacao DATETIME NOT NULL, Status VARCHAR(20) NOT NULL, Observacoes TEXT, PRIMARY KEY(id))'
        this.connection.query(sql, error =>{
            if (error) {
                console.log(error)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tables