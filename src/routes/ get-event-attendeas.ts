import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { nullable, z } from "zod";
import { prisma } from "../lib/prisma";
import { checkIn } from "./check-in";

export async function getEventAttendeas(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/events/:eventId/attendees', {
            schema: {
                summary: 'Get attendaes',
                tags: ['events'],
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                querystring: z.object({
                    query: z.string().nullish(),
                    pageIndex: z.string().nullish().default('0').transform(Number),
                }),
                response: {
                    200: z.object({
                        attendees: z.array(z.object({
                            id: z.number(),
                            name: z.string(),
                            email: z.string().email(),
                            createdAt: z.date(),
                            checkIndAt: z.date(),
                        }))
                    })

                },
            }
        }, async (request, reply) => {
            const { eventId } = request.params
            const { pageIndex, query } = request.query

            const attendaes = await prisma.attendae.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createAt: true,
                    checkIn: {
                        select: {
                            createdAt: true
                        }
                    }
                },

                where: query ? {
                    eventId,
                    name: {
                        contains: query
                    }
                } : {
                    eventId
                },

                take: 10,
                skip: pageIndex * 10,
                orderBy: {
                    createAt: 'desc'
                }

            })

            return reply.send({
                 attendees: attendaes.map(
                    attendae => ({
                        id: attendae.id,
                        name: attendae.name,
                        email: attendae.email,
                        createdAt: attendae.createAt,
                        checkIndAt: attendae.checkIn?.createdAt ?? null
                    })
                )
            })
        })
}


