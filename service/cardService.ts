
import { CardRepositoryPGImpl } from "../repository/cardRepository.interface";
import ApiError from "../exceptions/apiError";

class CardService {

    cardRepository: CardRepositoryPGImpl;

    constructor(cardRepository: CardRepositoryPGImpl) {
        this.cardRepository = cardRepository;
    }
    async createCard(
        board_id: number,
        name: string,
        description: string,
        estimate: string,
        status: string,
        due_date: string,
        labels: string,
        card_id: number) {

        const card = await this.cardRepository.findCard(card_id)

        if (card.rows[0].exists) {
            throw ApiError.BadRequest('This card already exists')
        }
        const { rows } = await this.cardRepository.createCard(board_id, name, description, estimate, status, due_date, labels)

        return rows
    }

    async findCardById(id: string) {
        const { rows } = await this.cardRepository.findCardById(id);
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
        const { rows } = await this.cardRepository.updateCardById(board_id, name, description, estimate, status, due_date, labels, id)
        return rows
    }

    async deleteCardById(id: string) {
        const card = await this.cardRepository.deleteCardById(id)
        return card
    }
}

export default new CardService(new CardRepositoryPGImpl);
