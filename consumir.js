const kafka = require('kafka-node');

const ClientRest = require('node-rest-client').Client;

const clientRest = new ClientRest();

const Consumer = kafka.Consumer;

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

const clientKafka = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
});

const consumer = new Consumer(
    clientKafka,
    [{
        topic: 'topic1',
        partition: 0
    }], {
        autoCommit: true
    }
);

const mongo = function (payload) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("teste");
        dbo.collection("teste").insertOne(payload, {
            reconnectTries: 60,
            reconnectTries: 1000
        }, function (err, res) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log(res.insertedCount);
                db.close();
            }
        });
    });

}

const elast = function (payload) {
    const args = {
        data: payload,
        headers: {
            "Content-Type": "application/json"
        }
    };

    clientRest.post("http://localhost:9200/teste2/_doc", args, function () {

    });

}



consumer.on('message', function (message) {

    //mongo(JSON.parse(message.value));

    elast(JSON.parse(message.value));

    //console.log(message.key, message.value);
});