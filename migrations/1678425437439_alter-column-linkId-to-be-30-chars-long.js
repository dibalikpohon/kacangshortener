/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn('links', 'link_id', {
    type: 'char(30)',
  });
};

exports.down = (pgm) => {
  pgm.alterColumn('links', 'link_id', {
    type: 'char(12)',
  });
};
