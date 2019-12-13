const express = require(`express`);

const db = require(`./projects-model`);

const router = express.Router();

router.use(express.json());

const validateId = (req, res, next) => {
  const id = req.params.id;
  db.getProjectById(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: `Project ${id} not found` });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: `Unable to retrieve project` });
    });
};

router.get(`/`, (req, res) => {
  db.getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: `Unable to retrieve projects` });
    });
});

router.get(`/:id`, validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.get(`/:id/tasks`, validateId, (req, res) => {
  const id = req.project.id;

  db.getProjectTasks(id)
    .then(tasks => res.status(200).json(tasks))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: `Unable to retrieve tasks` });
    });
});

router.get(`/:id/resources`, validateId, (req, res) => {
  const id = req.project.id;
  db.getProjectResources(id)
    .then(resources => res.status(200).json(resources))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: `Unable to retrieve resources` });
    });
});

router.post(`/`, (req, res) => {
  const projectData = req.body;
  if (projectData.name) {
    db.addProject(projectData)
      .then(project => res.status(201).json(project))
      .catch(error => {
        console.error(error);
        res.status(500).json({ errorMessage: `Unable to add project` });
      });
  } else {
    res.status(400).json({ message: `Body must contain "name"` });
  }
});

router.post(`/:id/task`, validateId, (req, res) => {
  const id = req.project.id;
  const taskData = req.body;
  if (taskData.description) {
    db.addTask(taskData, id)
      .then(task => res.status(201).json(task))
      .catch(error => {
        console.error(error);
        res.status(500).json({ errorMessage: `Unable to add task` });
      });
  } else {
    res.status(400).json({ message: `Body must contain "description"` });
  }
});

router.post(`/:id/resource/:resourceId`, validateId, (req, res) => {
  const projectId = req.project.id;
  const resourceId = req.params.resourceId;

  db.addResourceToProject(projectId, resourceId)
    .then(added => {
      if (added) {
        res.status(201).json(added);
      } else {
        res
          .status(404)
          .json({ message: `Unable to locate resource ${resourceId}` });
      }
    })
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .json({ errorMessage: `Unable to add resource to project` });
    });
});

module.exports = router;
