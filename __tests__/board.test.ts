import supertest from "supertest";

import app from "../app";

const request = supertest(app)

describe('Board Endpoints', () => {
  it('should create a new board', async () => {
    const res = await request
     .post('/api/boards')
     .send({
        role: 'admin',
        name: 'evdegd', 
        color: '3',
        description: 'add routes',  
        board_id: 18,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('body.board');
  });

  it('should find a board by id', async () => {
    const res = await request.get(`/api/boards/4`);
    expect(res.statusCode).toEqual(200);
  });

  it('should update a board by id', async () => {
    const res = await request
      .put('/api/boards/2')
      .send({
        role: 'admin',
        name: 'evdegd', 
        color: '3',
        description: 'add routes',  
        board_id: 18,    
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete a board by id', async () => {
    const res = await request
    .delete('/api/boards/4')
    .send({role: 'admin'});
    expect(res.statusCode).toEqual(200);
  });

});
