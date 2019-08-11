var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:32768/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) throw err;
    var dbo = db.db("teste");
    const inicio = new Date();
    for (var x = 0; x < 50000; x++) {
        var myobj = {
            "user": "lima",
            "post_date": new Date().toISOString(),
            "message": "teste teste teste teste"
        };
        dbo.collection("teste4").insertOne(myobj, function (err, res) {
            if (err) throw err;
            //console.log("1 document inserted");
            db.close();
        });
    }
    const fim = new Date();
    console.log(fim-inicio);
});