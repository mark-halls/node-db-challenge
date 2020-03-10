const server = require(`./api/server`);

const port = process.env.PORT || 4000;

server.listen(port, () =>
  console.log(`\n **API Listening on Port ${port}** \n`)
);

// const db = require(`./projects/projects-model`);

// db.getProjectTasks(1).then(task => console.log(task));
