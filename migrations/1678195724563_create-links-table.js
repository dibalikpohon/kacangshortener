/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('links', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    link_id: {
      type: 'char(12)',
      unique: true,
      notNull: true,
    },
    website: {
      type: 'text',
      notNull: true,
    },
  });
  pgm.createIndex('links', [
    {name: 'link_id', sort: 'ASC', unique: 'true', method: 'btree'},
  ]);
};

exports.down = (pgm) => {
  pgm.dropIndex('links', ['link_id'], {ifExists: true});
  pgm.dropTable('links', {ifExists: true});
};
