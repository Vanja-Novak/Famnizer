function User() {

    if(arguments.length === 1) {
        initFromObject.call(this, arguments['0']);
    } else if(arguments.length === 3) {
        initFromParams.call(this, arguments['0'], arguments['1'], arguments['2'] );
    } else {
        throw new Error('Wrong user constructor arguments');
    }
}

function initFromObject(user) {
    this.id = user.id;
    this.login = user.login;
    this.password = user.password;
}

function initFromParams(id, login, password) {
    this.id = id;
    this.login = login;
    this.password = password;
}

module.exports = User;