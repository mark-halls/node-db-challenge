exports.up = function(knex) {
  return knex.schema.createTable(`project_tasks`, tbl => {
    tbl
      .integer(`project_id`)
      .unsigned()
      .notNullable()
      .references(`id`)
      .inTable(`projects`)
      .onDelete(`CASCADE`)
      .onUpdate(`CASCADE`);
    tbl
      .integer(`task_id`)
      .unsigned()
      .notNullable()
      .unique()
      .references(`id`)
      .inTable(`tasks`)
      .onDelete(`CASCADE`)
      .onUpdate(`CASCADE`);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists(`project_tasks`);
};
