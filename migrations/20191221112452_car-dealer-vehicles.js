
exports.up = function(knex) {
  return knex.schema.createTable('vehicles', tbl => {
    tbl.text('VIN', 17).primary().unique().notNullable();
    tbl.text('make').notNullable();
    tbl.text('model').notNullable();
    tbl.float('mileage', 6).notNullable();
    tbl.string('transmissionType');
    tbl.string('titleStatus');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vehicles');
};
