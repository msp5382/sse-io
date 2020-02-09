var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = {

    stream: (userId, res) => {
        console.log("Got a subscriber id ="+userId)
        res.status(200).set({
          "connection": "keep-alive",
          "content-type": "text/event-stream",
          "Access-Control-Allow-Origin":"*"
        });
        eventEmitter.on(`push to ${userId}`, (a) => {
            res.write(`data: ${JSON.stringify(a)} \n\n`);
        })
    },
    push: (userId,toSend) => {
        eventEmitter.emit(`push to ${userId}`, { param: toSend })
    }
}