import {pool} from "../db";

import {createCard, findCardById, updateCardById, deleteCardById, findCard } from "../query/card-query"
import ApiError from "../exceptions/api-error";

class CardService {
    async createCard(
        board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string, 
        card_id: string) {

        const card = await pool.query( findCard,
            [card_id]
        );
        if (card.rows[0].exists) {
            throw ApiError.BadRequest('This card already exists')
        }
        const { rows } = await pool.query( createCard,
            [board_id, name, description, estimate, status, due_date, labels]
        );

        return rows
    }

    async findCardById(id: string) {
        const { rows } = await pool.query(findCardById, [id]);
        if (!rows.length) {
            throw ApiError.BadRequest('Nothing was found')
        }
        return rows
    }

    async updateCardById(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string, 
        id: string) {
            const { rows } = await pool.query(updateCardById,
                [board_id, name, description, estimate, status, due_date, labels, id]);
                return rows
    }

    async deleteCardById(id: string) {
        const card = await pool.query(deleteCardById, 
            [id]);
            return card
        }
}

export default new CardService();
