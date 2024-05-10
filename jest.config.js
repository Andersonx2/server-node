const { createServer } = require('http');
const { FastifyInstance } = require('fastify');
const fastify = require('fastify')({ logger: false });
const supertest = require('supertest');
const { getEvent } = require('./src/routes/get-event');

// Importe o código que define o endpoint getEvent
fastify.register(getEvent);

// Crie um servidor HTTP para o Fastify
const server = createServer(fastify);

// Crie uma instância do supertest passando o servidor HTTP
const request = supertest(server);

// Teste automatizado para o endpoint GET /events/:eventId
describe('GET /events/:eventId', () => {
    it('Deve retornar os detalhes do evento quando o ID do evento é válido', async () => {
        // Simula uma solicitação GET para o endpoint com um ID de evento válido
        const response = await request.get('/events/valid-event-id');

        // Verifica se o status da resposta é 200 (OK)
        expect(response.status).toBe(200);

        // Verifica a estrutura da resposta
        expect(response.body).toHaveProperty('event');
        expect(response.body.event).toHaveProperty('id');
        expect(response.body.event).toHaveProperty('title');
        expect(response.body.event).toHaveProperty('slug');
        // Adicione mais verificações conforme necessário para a estrutura do evento

        // Verifica se os dados retornados são válidos
        // Você pode adicionar mais verificações conforme necessário

        // Exemplo: Verifica se o ID do evento é uma string UUID válida
        expect(response.body.event.id).toMatch(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    });

    it('Deve retornar um erro quando o ID do evento não é encontrado', async () => {
        // Simula uma solicitação GET para o endpoint com um ID de evento inválido
        const response = await request.get('/events/invalid-event-id');

        // Verifica se o status da resposta é 404 (Not Found) ou outro código de erro adequado
        expect(response.status).toBe(404);
        // Verifica o corpo da resposta para garantir que a mensagem de erro está presente
        expect(response.body).toHaveProperty('message', 'Event not found');
    });
});

// Inicie o servidor antes de executar os testes
beforeAll(async () => {
    await fastify.ready();
});

// Feche o servidor após os testes
afterAll(async () => {
    await fastify.close();
});
