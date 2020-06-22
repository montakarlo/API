const { UserRepository } = require('../repositories/userRepository');

class UserService {

    allUsers(){
        const items = UserRepository.getAll();
        if(!items.length) {
            return [];
        }
        return items;
    }

    addUser(user){
        let id = UserRepository.generateId();
        user['id'] = id;
        UserRepository.create(user);
    }

    updateUser(id, object){
        UserRepository.update(id, object);
    }

    deleteUser(id){
        UserRepository.delete(id);
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return [];
        }
        return item;
    }
}

module.exports = new UserService();
