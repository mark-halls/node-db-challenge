exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        { description: "make a list of previous jobs" },
        { description: "write down skills" },
        { description: "fruit" },
        { description: "yogurt" },
        { description: "train for 15 minutes" }
      ]);
    });
};
