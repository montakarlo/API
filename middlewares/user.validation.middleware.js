const { user } = require('../models/user');
const UserService = require('../services/userService');

let ValidateFields = (ArrToValidate, model) => {
    let exist = true
    model.forEach(element => {
        if (exist && !ArrToValidate.includes(element)){
            exist = false;
            return exist
        }
    });
    return exist
}

let deleteFromArr = (arr, value) => {
    return arr.filter(item => item !== value)
}

let deleteExternalFields = (objToDel, model) =>{
    let objToDelKeys = Object.keys(objToDel);
    let modelKeys = Object.keys(model);
    objToDelKeys.forEach(element => {
        !modelKeys.includes(element) ? delete objToDel[`${element}`] : 0;
    });
    return objToDel
}

let checkForSameKeyValue = (ObjToCheck, key, base) =>{
    let answer = false;
    base.forEach(element => {
        element[key] == ObjToCheck[key] && !answer ? answer = true : false;
    });
    return answer
}

let checkForSameId = (key, value, base) =>{
    let answer = false;
    base.forEach(element => {
        String(element[key]) == String(value) && !answer ? answer = true : false;
    });
    return answer
}

let getObjectByKey = (key, value, base) =>{
    let userObj = {}
    base.forEach(element => {
        element[key] == value ? userObj = {...element} : 0;
    });
    return userObj
}

const createUserValid = (req, res, next) => {
    let inputObj = req.body;
    let userKeys = Object.keys(user);
    userKeys = deleteFromArr(userKeys, 'id');
    let inputObjKeys = Object.keys(inputObj);
    let email = inputObj.email;
    let phoneNumber = inputObj.phoneNumber;
    let base = UserService.allUsers();
    if (!Object.keys(inputObj).length){
        req.body = [400, 'Request with empty data'];
        next();
    } else if (inputObjKeys.includes('id')){
        req.body = [400, 'Request does not have to exist an id field'];
        next();
    } else if (!ValidateFields(inputObjKeys, userKeys)){
        req.body = [400, 'Missing some fields'];
        next();
    } else if (email.slice(-10) != '@gmail.com'){
        req.body = [400, 'Incorrect email'];
        next(); 
    } else if (phoneNumber.slice(0,4) != '+380' || phoneNumber.length != 13){
        req.body = [400, 'Incorrect phone'];
        next();
    } else if (checkForSameKeyValue(inputObj, 'email', base)){
        req.body = [400, 'User with the same email already exist'];
        next();
    }else if (checkForSameKeyValue(inputObj, 'phoneNumber', base)){
        req.body = [400, 'User with the same phone number already exist'];
        next();
    } else if (inputObj['password'].length<3){
        req.body = [400, 'Incorrect password. Enter more than 3 symbols'];
        next();
    } else {
        req.body = deleteExternalFields(inputObj, user)
        next();
    }
    //     // TODO: Implement validatior for user entity during creation
}

const updateUserValid = (req, res, next) => {
    let id = req.params["id"];

    let inputObj = req.body;
    let userKeys = Object.keys(user);
    userKeys = deleteFromArr(userKeys, 'id');
    let inputObjKeys = Object.keys(inputObj);
    let email = inputObj.email;
    let phoneNumber = inputObj.phoneNumber;
    let base = UserService.allUsers();

    if (!Object.keys(inputObj).length){
        req.body = [400, 'Request with empty data'];
        next();        
    } else if (inputObjKeys.includes('id')){
        req.body = [400, 'Request does not have to exist an id field'];
        next();
    } else if (!ValidateFields(inputObjKeys, userKeys)){
        req.body = [400, 'Missing some fields'];
        next();
    } else if (email.slice(-10) != '@gmail.com'){
        req.body = [400, 'Incorrect email'];
        next(); 
    } else if (phoneNumber.slice(0,4) != '+380' || phoneNumber.length != 13){
        req.body = [400, 'Incorrect phone'];
        next();
    } else if (checkForSameKeyValue(inputObj, 'email', base)){
        req.body = [400, 'User with the same email already exist'];
        next();
    }else if (checkForSameKeyValue(inputObj, 'phoneNumber', base)){
        req.body = [400, 'User with the same phone number already exist'];
        next();
    }else if (inputObj['password'].length<3){
        req.body = [400, 'Incorrect password. Enter more than 3 symbols'];
        next();
    } else if (!checkForSameId("id", id, base)){
        req.body = [404, 'User with this id is not found'];
        next();
    } else {
        req.body = deleteExternalFields(inputObj, user)
        next();
    }
    // TODO: Implement validatior for user entity during update
}

const deleteUserById = (req, res, next) => {
    let id = req.params["id"];
    let base = UserService.allUsers();

    if (!checkForSameId("id", id, base)){
        req.body = [404, 'User with this id is not found'];
        next();
    } else {
        let a = getObjectByKey("id", req.params["id"], base)
        console.log("deleteUserById -> a", a)
        req.body = getObjectByKey("id", req.params["id"], base)
        next();
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.deleteUserById = deleteUserById;

// const createUserValid = (req, res, next) => {
//     let inputObj = req.body;
//     let userKeys = Object.keys(user)
//     userKeys = deleteFromArr(userKeys, 'id')
//     let inputObjKeys = Object.keys(inputObj)
//     if (Object.keys(inputObj).length){
//         if (!inputObjKeys.includes('id')){
//             let exist = ValidateFields(inputObjKeys, userKeys)
//             if(!exist){
//                 req.body = [404, 'Missing some fields'];
//                 next();
//             } else {
//                 let email = inputObj.email
//                 if (email.slice(-10) == '@gmail.com'){
//                     let phoneNumber = inputObj.phoneNumber
//                     if (phoneNumber.slice(0,4) == '+380' && phoneNumber.length == 13){
//                         res.body = deleteExternalFields(inputObj, user)
//                         next();
//                     } else {
//                         req.body = [400, 'Incorrect data'];
//                         next(); 
//                     }
//                 } else {
//                     req.body = [400, 'Incorrect data'];
//                     next(); 
//                 }
//             }
//         } else {
//             req.body = [404, 'Request does not have exist an id field '];
//             next();
//         }
//     }else{
//         req.body = [404, 'Request with empty data'];
//         next();
//     }
// }