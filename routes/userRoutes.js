const { Router } = require('express');
const UserService = require('../services/userService');
const { responseMiddleware } 
= require('../middlewares/response.middleware');
const { createUserValid, updateUserValid, deleteUserById} 
= require('../middlewares/user.validation.middleware');

const router = Router();

router.get("/:id", (req, res) =>{
  let id = req.params["id"];
  if (UserService.search({'id': id})){
    res.status(200);
    res.send(UserService.search({'id': id}));

  } else {
    res.status(404);
    res.json({
      error: true,
      message: 'User with this id is not found'})
  }
})

router.get("/", (req, res) =>{
  res.status(200);
  res.send(UserService.allUsers());
})

router.post("/", createUserValid, responseMiddleware, (req,res) => {
  UserService.addUser(req.body);
  let obj = req.body
  res.status(200);
  res.json(obj);
});

router.put("/:id", updateUserValid, responseMiddleware, (req,res) => {
  UserService.updateUser(req.params["id"], req.body);
  let obj = req.body
  res.status(200);
  res.json(obj);
});

router.delete("/:id", deleteUserById, responseMiddleware, (req,res) => {
  UserService.deleteUser(req.params["id"]);

  let obj = req.body
  res.status(200);
  res.json(obj);
});

module.exports = router;