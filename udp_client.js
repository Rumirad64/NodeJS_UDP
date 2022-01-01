const PORT = 6500;

const udp = require('dgram')
const client = udp.createSocket('udp4')

const data = Buffer.from('Hi from UDP client')

//? catch server replies
client.on('message', (msg, serverinfo) => {
    console.log('Data received from server : ' + msg.toString())
    console.log('Received %d bytes from %s:%d\n', msg.length, serverinfo.address, serverinfo.port)
});


setInterval(() => { 
    client.send(data, PORT, "192.168.1.120", error => {
        if (error) {
            console.log(error)
            client.close()
        } else {
            console.log('Data sent !!!')
        }
    });   
}, 1000);
