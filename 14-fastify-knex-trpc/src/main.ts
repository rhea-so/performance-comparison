import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import clustering from './clustering';
import Fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './router';

const fastify = Fastify({
  maxParamLength: 5000,
});

fastify.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

async function bootstrap(): Promise<void> {
  await fastify.listen({ port: 3000 });
}

clustering(bootstrap, 10);
