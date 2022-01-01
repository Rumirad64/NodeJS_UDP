const PORT = 6500;
const udp = require('dgram');
const server = udp.createSocket('udp4');

server.on('error', (error) => {
    console.log(`UDP Server Error -> ${error.message} `);
    server.close();
});

server.on('message', (msg, client) => {
    console.log("Received -> ", msg.toString() + ` ${msg.length} bytes from ${client.address}:${client.port}`);

    let timestamp = new Date().toLocaleString();
    const response = {
        msg: 'Reply From UDP server !',
        port: 6500,
        timestamp: timestamp,
        received_data: {
            message: msg.toString(),
            SourceIP: client.address,
            SourcePort: client.port
        }
    }
    const data = Buffer.from(JSON.stringify(response, null, 4));

    //send reply
    server.send(data, client.port, client.address, (error, bytes) => {
        if (error) {
            console.log(`UDP Communication Error -> ${error.message} `)
            client.close();
        } else {
            console.log(`Data sent to -> ${JSON.stringify(client)}`);
        }
    });
});


server.on('listening', () => {
    console.log('Server is listening at port ' + server.address().port);
    console.log('Server ip :' + server.address().address);
    console.log('Server is IP4/IP6 : ' + server.address().family);
});

server.on('close', () => {
    console.log('Socket closed  !');
});

server.bind(PORT,"0.0.0.0", () => {
    console.log("Socket bind successful");
});
