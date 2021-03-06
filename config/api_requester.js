/**e
 * Created by Felix on 19-12-2017.
 */

// const https = require('https');
const http = require('http');
const host = 'localhost'; //checken of deze port geldig blijft

const request = function performRequest(endpoint, method, data, cb) {
    const payload = JSON.stringify(data);
    let headers = {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    };

    const options = {
        host: host,
        port: 55512,
        path: endpoint,
        method: method,
        headers: headers
    };

    const req = http.request(options, function(res) {
        res.setEncoding('utf-8');

        let responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
            const response = JSON.parse(responseString);
            cb(response);
        });
        res.on('error', (error) => {
            cb({ error: error });
        })
    })
    .on('error', (error) => {
        cb({ error: error });
    });

    req.write(payload);
    req.end();
};

module.exports = {
    request : request
};