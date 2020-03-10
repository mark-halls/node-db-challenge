const express = require(`express`);

const db = require(`./projects-model`);

const router = express.Router();

router.use(express.json());

router.get(`/`, (req, res) => {
  db.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: `Unable to retrieve resources` });
    });
});

router.post(`/`, (req, res) => {
  const resourceData = req.body;
  if (resourceData.name) {
    db.addResource(resourceData)
      .then(resource => res.status(201).json(resource))
      .catch(error => {
        console.error(error);
        res.status(500).json({ errorMessage: `Unable to add resource` });
      });
  } else {
    res.status(400).json({ message: `Body must contain "name"` });
  }
});

module.exports = router;
