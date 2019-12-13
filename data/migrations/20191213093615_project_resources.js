exports.up = function(knex) {
  return knex.schema.createTable(`project_resources`, tbl => {
    tbl
      .integer(`project_id`)
      .unsigned()
      .notNullable()
      .references(`id`)
      .inTable(`projects`)
      .onDelete(`CASCADE`)
      .onUpdate(`CASCADE`);
    tbl
      .integer(`resource_id`)
      .unsigned()
      .notNullable()
      .references(`id`)
      .inTable(`resources`)
      .onDelete(`CASCADE`)
      .onUpdate(`CASCADE`);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(`project_resources`);
};
