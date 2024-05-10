import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { strict } from "assert";
import { BadRequest } from "./_errors/bad-request";

export async function getAttendaeBadge(app: FastifyInstance) {
3
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/attendaes/:attendaeId/badge', {
            schema: {
                summary: 'Get an attendee badge',
                tags: ['attendaes'],
                params: z.object({
                    attendaeId: z.coerce.number().int(),
                }),
                response: {
                    200: z.object({
                        badge: z.object({ 
                            name: z.string(),
                            email: z.string(),
                            
                            eventTitle: z.string(),
                            checkInURL: z.string().url()
                        }),
                    }),
                },
            }
        }, async (request, reply) => {

            const { attendaeId } = request.params;
            const attendae = await prisma.attendae.findUnique({
                select: {
                    name: true,
                    email: true,
                    event: {
                        select: {
                            title: true,

                        }
                    }
                },
                where: {
                    id: attendaeId,
                }
            })

            if (attendae == null) {
                throw new BadRequest('Attendae not found')
            }

            const baseUrl = `${request.protocol}://${request.hostname}`
            const checkInURL = new URL(`/atendeas/${attendaeId}/checkin-in`, baseUrl)
            console.log(checkInURL)

            return reply.send({
                badge: {
                    name: attendae.name,
                    email: attendae.email,
                    eventTitle: attendae.event.title,
                    checkInURL: checkInURL.toString(),
     
                }
            })

        })

}