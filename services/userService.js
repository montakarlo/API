const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    allUsers(){
        const items = UserRepository.getAll();
        if(!items.length) {
            return null;
        }
        return items;
    }

    addUser(user){
        let id = UserRepository.generateId
        user['id'] = id
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
            return null;
        }
        return item;
    }
}

module.exports = new UserService();