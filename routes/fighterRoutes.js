const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, deleteFighterById } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get("/:id", (req, res) =>{
  let id = req.params["id"];
  if (FighterService.search({'id': id})){
    res.send(FighterService.search({'id': id}));
  } else {
    res.status(404);
    res.json({
      error: true,
      message: 'Fighter with this id is not found'})
  }
})

router.get("/", (req, res) =>{
  res.send(FighterService.allFighters());
})

router.post("/", createFighterValid, responseMiddleware, (req,res) => {
  console.log('Pushed');
  FighterService.addFighter(req.body);

  let obj = req.body
  res.status(200);
  res.json(obj);
});

router.put("/:id", updateFighterValid, responseMiddleware, (req,res) => {
  console.log('Successfully updated');
  FighterService.updateFighter(req.params["id"], req.body);

  let obj = req.body
  res.status(200);
  res.json(obj);
});

router.delete("/:id", deleteFighterById, responseMiddleware, (req,res) => {
  console.log('Successfully deleted');
  FighterService.deleteFighter(req.params["id"]);

  let obj = req.body
  res.status(200);
  res.json(obj);
});
// TODO: Implement route controllers for fighter

module.exports = router;