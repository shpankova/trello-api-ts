/* eslint-disable no-undef */
import supertest from "supertest";
import { Pool } from "pg";
import app from "../app";
const request = supertest(app);

beforeAll(() => {
  process.env.NODE_ENV = "test";
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "61665786",
    port: 5432
  });
  pool.query(`CREATE TABLE IF NOT EXISTS "board"
  (   "board_id" SERIAL PRIMARY KEY, 
      "name" text NOT NULL,
      "color" text NOT NULL,
      "description" text NOT NULL,
      "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
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
  "board"`);
});

describe("Board Endpoints", () => {
  it("should create a new board", async () => {
    const res = await request
      .post("/api/boards")
      .send({
        name: "evdegd",
        color: "3",
        description: "add routes",
        board_id: 2,
        role: "admin"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Board added successfully!");
  });

  it("should find a board by id", async () => {
    const res = await request.get("/api/boards/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Board found successfully!");
  });

  it("should update a board by id", async () => {
    const res = await request
      .put("/api/boards/1")
      .send({
        role: "admin",
        name: "evdegd",
        color: "5",
        description: "add routes",
        board_id: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Board Updated Successfully!");
  });

  it("should delete a board by id", async () => {
    const res = await request
      .delete("/api/boards/1")
      .send({ role: "admin" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Board deleted successfully!");
  });
});
