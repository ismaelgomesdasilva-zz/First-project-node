const { response } = require('express')
const uuid = require ('uuid')
const express = require('express') //importação do express. | mesmo nome quando instalou "npm install express"
const { request } = require('express')
const app = express() // para facilitar a vida, podemos colocar o express dentro de uma variavel
const port = 3000
app.use(express.json())

// GET => BUSCA INFORMAÇÃO.
// POST => CRIA INFORMAÇÃO.
// PUT/PATCH => ALTERA/ATUALIZA INFORMAÇÃO.
// DELETE => DELETA INFORMAÇÃO.
// middleware => interceptador, tem o poder de parar ou alterar dados de requisição.

const users = []
const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index < 0){
        return response.status(404).json({message: "User not Found"})
    }
    request.userIndex = index
    request.userId = id
    next()
}

app.get('/users', (request, response)=>{
    return response.json(users)
    
})
app.post('/users', (request, response)=>{
    const{name, age} = request.body

    const user = {id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
    
})

app.put('/users/:id',checkUserId, (request, response)=>{
    
    const{name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age}
    
    users[index] = updateUser
    return response.json(updateUser)
    
})

app.delete('/users/:id',checkUserId, (request, response)=>{
    const index = request.userIndex

    
    users.splice(index,1)

    return response.json({message: "deleted user"})

})






app.listen(port, () => {
    console.log(`🚀Server started on port ${port}🚀`)
})