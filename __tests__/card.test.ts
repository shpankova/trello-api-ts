/* eslint-disable no-undef */
import supertest from "supertest";
import { pool } from "../db";
import app from "../app";
import { createBoard } from "../query/boardQuery";
const request = supertest(app);

beforeAll(() => {
  process.env.NODE_ENV = "test";
  pool.query(`CREATE TABLE IF NOT EXISTS "board"
  (   "board_id" SERIAL PRIMARY KEY, 
      "name" text NOT NULL,
      "color" text NOT NULL,
      "description" text NOT NULL,
      "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
  )
  `);

  pool.query(`CREATE TABLE IF NOT EXISTS "card"
  (   "card_id" SERIAL PRIMARY KEY,
      "board_id" integer NOT NULL,
      "name" text NOT NULL,
      "description" text NOT NULL,
      "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
      "estimate" text,
      "status" text NOT NULL,
      "due_date" timestamp without time zone NOT NULL,
      labels text NOT NULL,
      FOREIGN KEY (board_id) REFERENCES "board" (board_id) ON DELETE CASCADE
  )
  `);
  pool.query(createBoard, ["evdegd", "3", "add routes"]);
});

afterAll(() => {
  pool.query(`DROP TABLE
  "board"`);
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
        card_id: 1
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
