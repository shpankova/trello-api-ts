import { CardServicePGImpl } from "../interfaces/cardService.interface";
import { CardRepositoryPGImpl } from "../interfaces/cardRepository.interface";
import ApiError from "../exceptions/apiError";

class CardService {

    cardService: CardServicePGImpl;

    constructor(cardService: CardServicePGImpl) {
        this.cardService = cardService;
    }
    
    async createCard(board_id: number,
                    name: string,
                    description: string,
                    estimate: string,
                    status: string,
                    due_date: string,
                    labels: string,
                    card_id: number) {
        const card = await this.cardService.createCard(board_id, name, description, estimate, status, due_date, labels, card_id)
        return card
    }

    async findCardById(id: string) {
        const { rows } = await this.cardService.findCardById(id);
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
        const { rows } = await this.cardService.updateCardById(board_id, name, description, estimate, status, due_date, labels, id)
        return rows
    }

    async deleteCardById(id: string) {
        const card = await this.cardService.deleteCardById(id)
        return card
    }
}

export default new CardService(new CardServicePGImpl(new CardRepositoryPGImpl));
