import { FastifyInstance } from "fastify"
import { BadRequest } from "./routes/_errors/bad-request"
import { ZodError } from "zod"
import { request } from "http"


type FastifyErrorHandler = FastifyInstance['errorHandler']


export const errorHandler: FastifyErrorHandler  = ( error, request,reply )=>{

    if (error instanceof ZodError){ 
        return reply.status(400).send({
            message: 'Error during validation',
            errors: error.format(),
           })
    }

    if (error instanceof BadRequest){
        return reply.status(400).send({menssage: error.message})  
    }

    return reply.status(400).send({mensage: 'Aconteceu um error'})



}