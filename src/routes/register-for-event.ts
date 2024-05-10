import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z, } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";


export async function registerForEvent(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendaes', {
            schema: {
                summary: 'Register attendaes',
                tags: ['attendaes'],
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email(),
                }),
                params: z.object({
                    eventId: z.string().uuid(),
                }),

                response: {
                    201: z.object({
                        attendaeId: z.number(),
                    })
                }
            }
        }, async (request, reply) => {

            const { eventId } = request.params
            const { name, email } = request.body

            const attendaeFromEmail = await prisma.attendae.findUnique({

                where: {
                    eventId_email: {
                        email,
                        eventId,
                    }
                }
            })

            if (attendaeFromEmail !== null) {
                throw new BadRequest('Attendae with same email already exist.')
            }

            const [event, amountOfAttendeaesForEvent] = await Promise.all([
                prisma.event.findUnique({
                    where: {
                        id: eventId,
                    }
                }),
                prisma.attendae.count({
                    where: {
                        eventId,
                    }
                })
            ])

            if (event?.maximumAttendeaes && amountOfAttendeaesForEvent > event?.maximumAttendeaes) {
                throw new BadRequest('The maxmum number of attendaes for this event has been reached')
            }


            const attendae = await prisma.attendae.create({
                data: {
                    name,
                    email,
                    eventId,
                }
            })
            return reply.status(201).send({ attendaeId: attendae.id })
        })
}