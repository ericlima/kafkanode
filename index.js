const kafka = require('kafka-node');

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

const client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
});

const Producer = kafka.HighLevelProducer;

const options = {
    // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 1,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
    partitionerType: 2
};

const producer = new Producer(client, options);

const chunk = {
    "token": "d7bbb3d8-21c5-408f-accb-6c3cc97789bb",
    "loginSystemId": "IMPRESASFF",
    "user": {
        "email": "egvlima@impresa.pt",
        "uuid": "9e715c97-2448-45f7-b47c-1542b88d38b5",
        "sourceSystem": "SSO",
        "mustReset": false,
        "status": "ACTIVE",
        "createdDate": "2019-04-24T14:52:25.571Z",
        "segments": [{
            "uuid": "assinantes",
            "segmentName": "Assinantes"
        }],
        "properties": {
            "firstName": "Eric",
            "lastName": "Lima",
            "birthdate": "1970-01-09",
            "gender": "m",
            "name": "Eric George Vasconcelos de Lima"
        },
        "entitlements": {
            "expresso": {
                "semanario": true,
                "diario": true
            }
        }
    },
    "lastLogin": "2019-08-05T22:13:37.813570Z",
    "expires": "2043-07-31T08:13:41.011Z",
    "userUUID": "9e715c97-2448-45f7-b47c-1542b88d38b5"
};

const payloads = [{
    topic: 'topic1',
    messages: JSON.stringify(chunk), // multi messages should be a array, single message can be just a string or a KeyedMessage instance
    key: chunk.userUUID, // string or buffer, only needed when using keyed partitioner
    partition: 0, // default 0
    attributes: 2, // default: 0
    timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
}];

// MongoClient.connect(url, {
//     useNewUrlParser: true
// }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("teste");
//     const inicio = new Date();
//     for (var x = 0; x < 50000; x++) {
//         var myobj = {
//             "user": "lima",
//             "post_date": new Date().toISOString(),
//             "message": "teste teste teste teste"
//         };
//         dbo.collection("teste4").insertOne(chunk, function (err, res) {
//             if (err) throw err;
//             //console.log("1 document inserted");
//             db.close();
//         });
//     }
//     const fim = new Date();
//     console.log("mongo insert ",fim-inicio);
// });

producer.once('ready', function () {
    for (var x = 0; x < 100; x++)
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
});

producer.on('error', function (err) {
    console.log(err);
});