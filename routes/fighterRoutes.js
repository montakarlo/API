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
});

router.put("/:id", updateFighterValid, responseMiddleware, (req,res) => {
  console.log('Successfully updated');
  FighterService.updateFighter(req.params["id"], req.body);
});

router.delete("/:id", deleteFighterById, responseMiddleware, (req,res) => {
  console.log('Successfully deleted');
  FighterService.deleteFighter(req.params["id"]);
});
// TODO: Implement route controllers for fighter

module.exports = router;