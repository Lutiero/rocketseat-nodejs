import { env } from "./env";
import fastify from "fastify";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(transactionsRoutes, { prefix: "/transactions" });

app
  .listen({
    port: parseInt(env.PORT),
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`);
  });
