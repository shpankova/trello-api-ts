export const createCard = `
INSERT INTO 
    "card" 
    ( board_id, name, description, estimate, status, due_date, labels) 
VALUES 
    ($1, $2, $3, $4, $5, $6, $7)`;

export const findCardById = `
SELECT 
    card_id,
    board_id,
    name, 
    description,
    created_at,
    status,
    due_date,
    labels
FROM 
    "card" 
WHERE 
    card_id = $1`;



export const findCard = `
SELECT EXISTS ( 
SELECT 1
FROM 
    "card" 
WHERE 
    card_id = $1)`;


export const updateCardById = `
UPDATE 
    "card" 
SET 
    board_id =$1,
    name = $2, 
    description = $3,
    estimate = $4,  
    status = $5, 
    due_date = $6,
    labels = $7
WHERE 
    card_id = $8`;

export const deleteCardById = `
DELETE FROM 
    "card" 
WHERE 
    card_id = $1`;


