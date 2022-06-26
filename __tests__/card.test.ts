import supertest from "supertest";

import app from "../app";

const request = supertest(app)

describe('Card Endpoints', () => {
  it('should create a new card', async () => {
    const res = await request
    .post('/api/cards')
    .send({
        board_id: 2,
        name: 'evdegd', 
        description: 'add routes',  
        estimate: 'ert',
        status: 'in process', 
        due_date: '990109', 
        labels: '5g55',
        card_id: 25     
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('body.card');
  });

  it('should find a card by id', async () => {
    const res = await request.get(`/api/cards/1`);
    expect(res.statusCode).toEqual(200);
  });

  it('should update a card by id', async () => {
    const res = await request
      .put('/api/cards/1')
      .send({
        board_id: 4,
        name: 'evdegd', 
        description: 'add routes',  
        estimate: 'ert',
        status: 'in process', 
        due_date: '990109', 
        labels: '5g55',
        card_id: 19      
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });



  it('should delete a card by id', async () => {
    const res = await request.delete('/api/cards/1');
    expect(res.statusCode).toEqual(200);
  });

  

});
