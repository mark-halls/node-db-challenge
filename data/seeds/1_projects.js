exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        { name: "Resume", description: "write a cool resume" },
        { name: "Shopping" },
        { name: "Exercise" }
      ]);
    });
};
