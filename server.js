/*import {createServer } from "node:http"

const server = createServer((request, response) => {
    response.write("Hello, world!")

    return response.end()
})

// o listen passa a porta da aplicação
server.listen(3333)*/

import {fastify} from "fastify"
import { DatabasePostgres} from "./database-postgres.js"

const server = fastify()
const database = new DatabasePostgres

// Request Body => Corpo da requisição, que enviamos no post e put

//criar vídeos 
server.post("/videos", (request, reply) => {
    const {title, description, duration} =  request.body

    database.create({
        title,
        description,
        duration,
    })

    console.log(database.list())

    // 201 diz que algo foi criado
    return reply.status(201).send("vídeo criado")
})

// pegar vídeos
server.get("/videos", (request) => {
    const search = request.query.search
    console.log(search)
    const videos = database.list()

    return videos
})

// atualizar um vídeo
server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    database.update(videoId, {
        title, 
        description,
        duration,
    })

    // resposta teve sucesso mas não tem contéudo na resposta
    return reply.status(204).send()
})

//deltar o vídeo
server.delete("/videos/:id", (request, reply) =>{
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

//cria uma rota e um objeto e dentro passa a porta
server.listen({
    port: 3333,
})
