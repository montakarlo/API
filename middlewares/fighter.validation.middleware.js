const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService');

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
    let fighterObj = {}
    base.forEach(element => {
        element[key] == value ? fighterObj = {...element} : 0;
    });
    return fighterObj
}

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    let inputObj = req.body;
    let fighterKeys = Object.keys(fighter);
    fighterKeys = deleteFromArr(fighterKeys, 'id');
    let inputObjKeys = Object.keys(inputObj);
    let base = FighterService.allFighters();
    if (!Object.keys(inputObj).length){
        req.body = [400, 'Request with empty data'];
        console.log('error')
        next();
    } else if (inputObjKeys.includes('id')){
        req.body = [400, 'Request does not have to exist an id field'];
        console.log('error')
        next();
    } else if (!ValidateFields(inputObjKeys, fighterKeys)){
        req.body = [400, 'Missing some fields'];
        console.log('error')
        next();
    } else if (checkForSameKeyValue(inputObj, 'name', base)){
        req.body = [400, 'Fighter with the same name already exist'];
        console.log('error')
        next();
    } else if (+inputObj['power'] >= 100 || +inputObj['power'] < 0 || typeof inputObj['power'] != 'number'){
        req.body = [400, 'Power value must be a number from range (0, 100)'];
        console.log('error')
        next();
    } else if (+inputObj['defense'] < 1 || +inputObj['defense'] > 10 || typeof inputObj['defense'] != 'number'){
        req.body = [400, 'Defense value must be a number from range (1, 10)'];
        console.log('error')
        next();
    } else if (typeof inputObj['health'] != 'number'){
        req.body = [400, 'Health value must be a number'];
        console.log('error')
        next();
    } else {
        req.body = deleteExternalFields(inputObj, fighter)
        console.log('go to respMid')
        next();
    }
}

const updateFighterValid = (req, res, next) => {
    let id = req.params["id"];
    // TODO: Implement validatior for fighter entity during update
    let inputObj = req.body;
    let fighterKeys = Object.keys(fighter);
    fighterKeys = deleteFromArr(fighterKeys, 'id');
    let inputObjKeys = Object.keys(inputObj);
    let base = FighterService.allFighters();
    if (!Object.keys(inputObj).length){
        req.body = [400, 'Request with empty data'];
        next();
    } else if (inputObjKeys.includes('id')){
        req.body = [400, 'Request does not have to exist an id field'];
        next();
    } else if (!ValidateFields(inputObjKeys, fighterKeys)){
        req.body = [400, 'Missing some fields'];
        next();
    } else if (+inputObj['power'] >= 100 || +inputObj['power'] < 0 || typeof inputObj['power'] != 'number'){
        req.body = [400, 'Power value must be a number from range (0, 100)'];
        next();
    } else if (+inputObj['defense'] < 1 || +inputObj['defense'] > 10 || typeof inputObj['defense'] != 'number'){
        req.body = [400, 'Defense value must be a number from range (1, 10)'];
        next();
    } else if (typeof inputObj['health'] != 'number'){
        req.body = [400, 'Health value must be a number'];
        next();
    } else if (checkForSameKeyValue(inputObj, 'name', base)){
        req.body = [400, 'Fighter with the same name already exist'];
        console.log('error')
        next();
    } else if (!checkForSameId("id", id, base)){
        req.body = [404, 'Fighter with this id is not found'];
        next();
    } else {
        req.body = deleteExternalFields(inputObj, fighter)
        next();
    }
}

const deleteFighterById = (req, res, next) => {
    let id = req.params["id"];
    let base = FighterService.allFighters();
    if (!checkForSameId("id", id, base)){
        req.body = [404, 'Fighter with this id is not found'];
        next();
    } else {
        req.body = getObjectByKey("id", req.params["id"], base)
        next();
    }
}
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.deleteFighterById = deleteFighterById;