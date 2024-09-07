import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knexDb } from "../database";
import { randomUUID } from "node:crypto";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, response) => {
    const transactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = transactionSchema.parse(request.body);

    await knexDb("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "debit" ? -amount : amount,
    });

    return response.code(201).send();
  });

  app.get("/", async () => {
    const transactions = await knexDb("transactions").select();

    return { transactions };
  });

  app.get("/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const transaction = await knexDb("transactions").where("id", id).first();
      return { transaction };
    } catch (error) {
      return response.code(404).send(error);
    }
  });

  app.get("/summary", async () => {
    const summary = await knexDb("transactions")
      .sum("amount", { as: "amount" })
      .first();

    return summary;
  });
}
