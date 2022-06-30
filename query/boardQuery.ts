export const createBoard = `
    INSERT INTO
        board
        (name, color, description) 
    VALUES 
        ($1, $2, $3) 
    RETURNING *`;

export const findBoardById = `
    SELECT 
        board_id,
        name,
        color,
        description,
        created_at      
    FROM 
        "board" 
    WHERE 
        board_id = $1`;

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
        board_id = $4
        RETURNING *`;

export const deleteBoardById = `
    DELETE FROM 
        "board" 
    WHERE 
        board_id = $1
        RETURNING *`;
