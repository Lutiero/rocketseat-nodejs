import { env } from "./env"
import fastify from "fastify"
import crypto from "crypto"
import { knexDb } from "./database"
import { transactionsRoutes } from "./routes/transactions"

const app = fastify()

app.register(transactionsRoutes)

app.post("/", async () => {
  const transaction = await knexDb("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "Salary1",
      amount: 1000,
    })
    .returning("*")

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`)
  })
