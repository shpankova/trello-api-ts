import { pool } from "../db";

import { createCard, findCardById, updateCardById, deleteCardById, findCard } from "../query/cardQuery";
import { Card, ResCard } from "../types/cardType";

class CardService {
  async createCard (card: Card): Promise<ResCard> {
    const cards = await pool.query(findCard,
      [card.card_id]
    );
    if (cards.rows[0].exists) {
      throw new Error("Card exists");
    }
    const createdCard = await pool.query(createCard,
      [card.board_id, card.name, card.description, card.estimate, card.status, card.due_date, card.labels]
    );

    return createdCard.rows[0];
  }

  async findCardById (id: string): Promise<ResCard> {
    const foundCard = await pool.query(findCardById, [id]);

    if (!foundCard.rows[0]) {
      throw new Error("Nothing was found");
    }
    return foundCard.rows[0];
  }

  async updateCardById (card: Card, id: string): Promise<ResCard> {
    const UpdatedCard = await pool.query(updateCardById,
      [card.board_id, card.name, card.description, card.estimate, card.status, card.due_date, card.labels, id]);
    return UpdatedCard.rows[0];
  }

  async deleteCardById (id: string): Promise<ResCard> {
    const card = await pool.query(deleteCardById,
      [id]);
    return card.rows[0];
  }
}

export default new CardService();
