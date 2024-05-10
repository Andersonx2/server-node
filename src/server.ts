import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendaeBadge } from "./routes/get-attendae-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendeas } from "./routes/ get-event-attendeas";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { errorHandler } from "./error-handler";
import { fastifyCors } from "@fastify/cors";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(fastifyCors, {
    origin: '*',
}
)
app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificações da api',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',

})






app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendaeBadge)
app.register(checkIn)
app.register(getEventAttendeas)



app.setErrorHandler(errorHandler)


app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
}
)