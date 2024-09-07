import { knexDb } from "../database"

export async function transactionsRoutes(app) {
  app.get("/", async () => {
    const transactions = await knexDb("transactions").select("*")

    return transactions
  })
}
