export const createBoard = `
    INSERT INTO
        board
        ( name, color, description ) 
    VALUES 
        ($1, $2, $3)`;

export const findBoardById = `
    SELECT 
        "board"."board_id",
        "board"."name" AS "board_name",
        "board"."color" AS "board_color",
        "board"."description" AS "board_description",
        "board"."created_at" AS "board_created_at",
        "card"."card_id",
        "card"."name" AS "card_name",
        "card"."description" AS "card_description",
        "card"."created_at" AS "card_created_at",
        "card"."estimate" AS "card_estimate",
        "card"."status" AS "card_status",
        "card"."due_date" AS "card_due_date",
        "card"."labels" AS "card_labels"
    FROM 
        "board" 
    JOIN 
        "card" 
    ON 
        "board"."board_id"="card"."board_id" 
    WHERE 
        "board"."board_id" = $1  `;



export const findBoard = `
    SELECT EXISTS ( 
    SELECT 1
    FROM 
        public.board     
    WHERE 
        board_id = $1)`;


export const updateBoardById = `
    UPDATE "board" 
    SET 
        name = $1, 
        color = $2,
        description = $3
    WHERE 
        board_id = $4`;

export const deleteBoardById = `
    DELETE FROM 
        "board" 
    WHERE 
        board_id = $1`;


