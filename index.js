const customExpress = require('./config/customExpress')
const connection = require('./infrastructure/connection')
const Tables = require('./infrastructure/tables')

connection.connect(error =>{
    if (error) {
        console.log(error)
    } else{
        console.log('Conectado com sucesso')

        Tables.init(connection)
        const app = customExpress()

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})
