import { pool } from "../db";
import { QueryResult } from 'pg';

import {createCard, findCardById, updateCardById, deleteCardById, findCard } from "../query/cardQuery"

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

interface CardRepository {
    findCard(card_id: number): Promise<QueryResult<Card>>;
    createCard(board_id: number,
            name: string, 
            description: string, 
            estimate: string, 
            status: string, 
            due_date: string, 
            labels: string): Promise<QueryResult<Card>>;
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

export class CardRepositoryPGImpl implements CardRepository {

    createCard(board_id: number,
            name: string, 
            description: string, 
            estimate: string, 
            status: string, 
            due_date: string, 
            labels: string): Promise<QueryResult<Card>> {

        return pool.query(createCard, [board_id, name, description, estimate, status, due_date, labels]);
    }

    findCard(card_id: number): Promise<QueryResult<Card>> {
        return pool.query(findCard, [card_id]);
    }

    findCardById(id: string): Promise<QueryResult<Card>>{
        return pool.query(findCardById, [id]);
    }

    updateCardById(board_id: number,
                name: string, 
                description: string, 
                estimate: string, 
                status: string, 
                due_date: string, 
                labels: string,
                id: string) : Promise<QueryResult<Card>> {
        return pool.query(updateCardById, [board_id, name, description, estimate, status, due_date, labels, id]);
    }

    deleteCardById(id: string): Promise<QueryResult<Card>>{
        return pool.query(deleteCardById, [id]);
    }

}

export class CardRepositoryTypeorm implements CardRepository {
    createCard(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string): Promise<QueryResult<Card>> {

        return 
    }
    findCard(): Promise<QueryResult<Card>> {
        return 
    }
    findCardById(id: string): Promise<QueryResult<Card>>{
        return pool.query(findCardById, [id]);
    }

    updateCardById(board_id: number,
        name: string, 
        description: string, 
        estimate: string, 
        status: string, 
        due_date: string, 
        labels: string,
        id: string) : Promise<QueryResult<Card>> {
        return 
    }
    deleteCardById(id: string): Promise<QueryResult<Card>>{
        return pool.query(deleteCardById, [id]);
    }

}
