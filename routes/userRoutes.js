const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid, deleteUserById} = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const bodyParser = require('body-parser');

const router = Router();

router.get("/:id", (req, res) =>{
  let id = req.params["id"];
  if (UserService.search({'id': id})){
    res.send(UserService.search({'id': id}));
  } else {
    res.status(404);
    res.json({
      error: true,
      message: 'User with this id is not found'})
  }
})

router.get("/", (req, res) =>{
  exports.userToInsert = { "firstName": "Elon", "lastName": "Mask", "email": "elonmask@gmail.com", "phoneNumber": "+380501234567", "password": "D123fdgsfgsg435tg" }
  res.send(UserService.allUsers());

})

router.post("/", createUserValid, responseMiddleware, (req,res) => {
  console.log('Pushed');
  UserService.addUser(req.body);
});

router.put("/:id", updateUserValid, responseMiddleware, (req,res) => {
  console.log('Successfully updated');
  UserService.updateUser(req.params["id"], req.body);
});

router.delete("/:id", deleteUserById, responseMiddleware, (req,res) => {
  console.log('Successfully deleted');
  console.log(req.params["id"]);

  UserService.deleteUser(req.params["id"]);
});

// TODO: Implement route controllers for user

module.exports = router;