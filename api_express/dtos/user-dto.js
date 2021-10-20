module.exports = class UserDto {
    username;
    id;
    constructor(model) {
        this.username = model.email;
        this.id = model._id;
    }
}
