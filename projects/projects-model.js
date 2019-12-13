const db = require(`../data/db-config`);

const convertCompleted = int => {
  return int ? true : false;
};

const getProjects = () => {
  return db(`projects`).then(projects =>
    projects.map(project => {
      return { ...project, completed: convertCompleted(project.completed) };
    })
  );
};

const getProjectById = id => {
  return db(`projects`)
    .where({ id })
    .first()
    .then(project => {
      return { ...project, completed: convertCompleted(project.completed) };
    });
};

const getProjectTasks = projectId => {
  return db(`project_tasks as p`)
    .where({ project_id: projectId })
    .innerJoin(`tasks as t`, `t.id`, `task_id`)
    .then(tasks =>
      tasks.map(task => {
        return { ...task, completed: convertCompleted(task) };
      })
    );
};

const getProjectResources = projectId => {
  return db(`project_resources`)
    .where({ project_id: projectId })
    .innerJoin(`resources as r`, `r.id`, `resource_id`);
};

const getResources = () => {
  return db(`resources`);
};

const getResourceById = id => {
  return db(`resources`).where({ id });
};

const getTasks = () => {
  return db(`tasks`);
};

const getTaskById = id => {
  return db(`tasks as t`)
    .select(`t.description`, `t.notes`, `t.completed`, `p.project_id`)
    .where({ id })
    .innerJoin(`project_tasks as p`, `p.task_id`, id);
};

const addTask = (data, projectId) => {
  return db(`tasks`)
    .insert(data)
    .then(([id]) =>
      db(`project_tasks`)
        .insert({ task_id: id, project_id: projectId })
        .then(() => getTaskById(id))
    );
};

const addProject = data => {
  return db(`projects`)
    .insert(data)
    .then(([id]) => getProjectById(id));
};

const addResource = data => {
  return db(`resources`).insert(data);
};

const addResourceToProject = (projectId, resourceId) => {
  return db(`project_resources`).insert({
    project_id: projectId,
    resource_id: resourceId
  });
};

module.exports = {
  getProjects,
  getProjectById,
  getProjectTasks,
  getResources,
  getResourceById,
  getProjectResources,
  getTasks,
  getTaskById,
  addProject,
  addTask,
  addResource,
  addResourceToProject
};
