const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    // TODO: Implement methods to work with fighters
    allFighters(){
        const items = FighterRepository.getAll();
        if(!items.length) {
            return null;
        }
        return items;
    }

    addFighter(fighter){
        let id = FighterRepository.generateId
        fighter['id'] = id
        FighterRepository.create(fighter);
    }

    updateFighter(id, object){
        FighterRepository.update(id, object);
    }

    deleteFighter(id){
        FighterRepository.delete(id);
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();