exports.up = function(knex) {
  return knex.schema.createTable(`projects`, tbl => {
    tbl.increments();
    tbl.string(`name`, 255).notNullable();
    tbl.string(`description`, 255);
    tbl
      .boolean(`completed`)
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(`projects`);
};
