function Room() {
    if(arguments.length === 1) {
        initRoomWithName.call(this, arguments['0']);
    } else if(arguments.length === 2) {
        initRoom.call(this, arguments['0'], arguments['1'] );
    } else {
        throw new Error('Wrong room constructor arguments');
    }
}

function initRoomWithName(name) {
    this.name = name;
}

function initRoom(id, name) {
    this.id = id;
    this.name = name;
}

module.exports = Room;