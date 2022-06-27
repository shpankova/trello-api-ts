import ApiError from "../exceptions/apiError";
import { QueryResult } from 'pg';


import { CardRepositoryPGImpl } from "./cardRepository.interface";


interface Card {
    board_id: number;
    name: string;
    description: string;
    estimate: string;
    status: string;
    due_date: string;
    labels: string;
    card_id: number;
    exists: boolean;
    id: string;
}

interface CardService {
    createCard(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string,
        card_id: number): Promise<QueryResult<Card>>;
updateCardById(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string,
        id: string) : Promise<QueryResult<Card>>;
deleteCardById(id: string): Promise<QueryResult<Card>>;
findCardById(id: string): Promise<QueryResult<Card>>;
}

export class CardServicePGImpl implements CardService {

    cardRepository: CardRepositoryPGImpl;

    constructor(cardRepository: CardRepositoryPGImpl) {
        this.cardRepository = cardRepository;
    }

    async createCard(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string,
        card_id: number): Promise<QueryResult<Card>> {
            const card = await this.cardRepository.findCard(card_id)

            if (card.rows[0].exists) {
                throw ApiError.BadRequest('This card already exists')
            }
            return await this.cardRepository.createCard(board_id, name, description, estimate, status, due_date, labels)
            }

    async findCardById(id: string): Promise<QueryResult<Card>> {
        return await this.cardRepository.findCardById(id);
    }
    async updateCardById(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string,
        id: string) : Promise<QueryResult<Card>> {
        return await this.cardRepository.updateCardById(board_id, name, description, estimate, status, due_date, labels, id)
    }

    async deleteCardById(id: string): Promise<QueryResult<Card>> {
        return await this.cardRepository.deleteCardById(id);
    }

}
