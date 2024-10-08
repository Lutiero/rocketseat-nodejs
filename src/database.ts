import { env } from "./env"
import knex from "knex"
import { Knex } from "knex"

export const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
}

export const knexDb = knex(config)
