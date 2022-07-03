/* eslint-disable no-undef */
import supertest from "supertest";
import { Pool } from "pg";
import app from "../app";
const request = supertest(app);

beforeAll(async () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "61665786",
    port: 5432
  });

  await pool.query(`CREATE TABLE IF NOT EXISTS "card"
  (   "card_id" SERIAL PRIMARY KEY,
      "board_id" integer NOT NULL,
      "name" text NOT NULL,
      "description" text NOT NULL,
      "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
      "estimate" text,
      "status" text NOT NULL,
      "due_date" timestamp without time zone NOT NULL,
      labels text NOT NULL
     )
  `);
});

afterAll(() => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "61665786",
    port: 5432
  });

  pool.query(`DROP TABLE 
  "сard"`);
});

describe("Card Endpoints", () => {
  it("should create a new card", async () => {
    const res = await request
      .post("/api/cards")
      .send({
        board_id: 1,
        name: "evdegd",
        description: "add routes",
        estimate: "ert",
        status: "in process",
        due_date: "990109",
        labels: "5g55",
        card_id: 2
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Card added successfully!");
  });

  it("should find a card by id", async () => {
    const res = await request.get("/api/cards/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Card found successfully!");
  });

  it("should update a card by id", async () => {
    const res = await request
      .put("/api/cards/1")
      .send({
        board_id: 1,
        name: "evdegd",
        description: "add routes",
        estimate: "ert",
        status: "in process",
        due_date: "990109",
        labels: "5g55",
        card_id: 19
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Card Updated Successfully!");
  });

  it("should delete a card by id", async () => {
    const res = await request.delete("/api/cards/1");
    expect(res.body.message).toBe("Card deleted successfully!");
  });
});
