var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
// client.get("http://localhost:9200/teste/_search", function (data, response) {
//     // parsed response body as js object
//     console.log(JSON.stringify(data));
//     // raw response
//     //console.log(response);
// }); 

// set content-type header and data as json in args parameter


const insere = function () {
    const args = {
        data: {
            "user": "lima",
            "post_date": new Date().toISOString(),
            "message": "teste teste teste teste"
        },
        headers: {
            "Content-Type": "application/json"
        }
    };

    client.post("http://localhost:9200/teste2/_doc",args,function() {});

}

const inicio = new Date();
for (var x = 0; x < 50000; x++) {
    insere();
}
const fim = new Date();
console.log(fim-inicio);