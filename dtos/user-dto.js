class UserDto {
    id;
    email;
    name;
    verified;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.name = user.name;
        this.verified = user.verified;
        this.createdAt = user.createdAt;
    }
}


module.exports = UserDto;