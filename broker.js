var mosca = require('mosca');

var pubsubsettings = { // define mqtt server backend at MongoDB mqtt DB
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt_brocker?auto_reconnect=true',
    pubsubCollection: 'mqtt_brocker_collection',
    mongo: {}
};

var settings = {
    port: 1883,
    backend: pubsubsettings,
    persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/mqtt_brocker'
    }
};

var server = new mosca.Server(settings);

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

server.on('published', function(packet, client) {
    if (packet.topic == 'msgs') {
        var stringBuf = packet.payload.toString('utf-8');
        var obj = JSON.parse(stringBuf);
        console.log(obj);
        //TODO: publish it again via broadcast
    }
});