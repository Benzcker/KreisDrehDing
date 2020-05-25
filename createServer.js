exports.create = () => 
{    
    const express = require('express'),
        app = express(),
        server = require('http').Server(app),
        port = 8080;
    
    app.get('/', (request, response) => 
    {
        // console.log(request.url);
        response.sendFile(__dirname + '/client/index.html');
    });
    
    app.use('/client', express.static(__dirname + '/client'));
    
    server.listen(port, err => 
    {
        if (err) 
        {
            console.log(err);
        }
        console.log('Server started.');
    });

    return server;
};
