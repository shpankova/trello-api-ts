"use strict";

let dbm;
let type;
let seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("card", {
    columns: {
      card_id: { type: "int", primaryKey: true, autoIncrement: true },
      board_id: {
        type: "int",
        name: "board_id_card_id_fk",
        table: "board",
        rules: {
          onDelete: "CASCADE"
        }
      },
      name: { type: "text", notNull: true },
      description: { type: "text", notNull: true },
      created_at: { type: "datetime", defaultValue: new String("CURRENT_TIMESTAMP"), notNull: true },
      estimate: { type: "text", notNull: true },
      status: { type: "text", notNull: true },
      due_date: { type: "datetime", notNull: true },
      labels: { type: "text", notNull: true }
    },
    ifNotExists: true
  });
};

exports.down = function (db) {
  return db.dropTable("card");
};

exports._meta = {
  version: 1
};
