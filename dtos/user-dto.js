class UserDto {
    id;
    email;
    name;
    age;
    weight;
    height;
    gender;
    verified;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.name = user.name;
        this.age = user.age;
        this.weight = user.weight;
        this.height = user.height;
        this.gender = user.gender;
        this.verified = user.verified;
        this.createdAt = user.createdAt;
    }
}


module.exports = UserDto;