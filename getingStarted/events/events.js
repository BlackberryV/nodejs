const events = require('events')
const eventEmitter = new events.EventEmitter();

const eventHandler = () => {
    console.log('Handle scream')
}

eventEmitter.on('scream', eventHandler)
eventEmitter.emit('scream')

