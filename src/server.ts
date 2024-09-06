import fastify from "fastify";
import crypto from "crypto";
import { knexDb } from "./database";

const app = fastify();

app.get("/", async () => {
  const transactions = await knexDb("transactions").select("*");

  return transactions;
});

app.post("/", async () => {
  const transaction = await knexDb("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "Salary1",
      amount: 1000,
    })
    .returning("*");

  return transaction;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`Server is running on port 3333`);
  });
