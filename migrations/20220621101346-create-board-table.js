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
  return db.createTable("board", {
    columns: {
      board_id: { type: "int", primaryKey: true, autoIncrement: true },
      name: { type: "text", notNull: true },
      color: { type: "text", notNull: true },
      description: { type: "text", notNull: true },
      created_at: { type: "datetime", defaultValue: new String("CURRENT_TIMESTAMP"), notNull: true }
    },
    ifNotExists: true
  });
};

exports.down = function (db) {
  return db.dropTable("board");
};

exports._meta = {
  version: 1
};
