import { FastifyInstance } from "fastify";
import { request } from "http";
import { prisma } from "../lib/prisma";
import { z } from 'zod'
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "./_errors/bad-request";

export async function checkIn(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/attendaes/:attendaeId/check-in', {
            schema: {
                summary: 'Check-ins',
                tags: ['check-in'],
                params: z.object({
                    attendaeId: z.coerce.number().int()
                }),
                200: z.object({
                    checkIn: z.boolean()
                })
            }
        },
            async (request, reply) => {
                const { attendaeId } = request.params

                const attendaeCheckIn = await prisma.checkin.findUnique({
                    where: {
                        attendaeId,
                    }
                })

                if (attendaeCheckIn!== null) {
                    throw new BadRequest('Attendeae already cheked in')
                }

                await prisma.checkin.create({
                    data: {
                        attendaeId
                    }
                })

                return reply.status(200).send()

            }
        )
}