const express = require(`express`);

const projectRouter = require(`../projects/projects-router`);
const resourcesRouter = require(`../projects/resources-router`);
const server = express();

server.use(`/api/projects`, projectRouter);
server.use(`/api/resources`, resourcesRouter);

module.exports = server;
