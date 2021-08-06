const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento{
    adiciona(atendimento, response){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.client.length >= 5
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const errors = validacoes.filter(campo => !campo.valido)
        const existsErrors = errors.length

        if (existsErrors) {
            response.status(400).json(errors)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
            connection.query(sql, atendimentoDatado, (error, results)=>{
                if (error) {
                    response.status(400).json(error)
                } else {
                    response.status(201).json(atendimentoDatado)
                }
            })
        }
        
    }

    lista(response){
        const sql = 'SELECT * FROM Atendimentos'

        connection.query(sql, (error, results)=>{
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json(results)
            }
        })
    }

    buscaPorId(id, response){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        connection.query(sql, (error, results)=>{
            const atendimento = results[0]
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json(atendimento)
            }
        })
    }

    alterar(id, valores, response){
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        connection.query(sql, [valores, id], (error, results)=>{
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json({...valores, id})
            }
        })
    }

    deletar(id, response){
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'
        connection.query(sql, id, (error, results)=>{
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento