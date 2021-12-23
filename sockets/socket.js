const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado} = require('../controllers/socket')
// Mensajes de Sockets
io.on('connection', (client) => {
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    console.log(client.handshake.headers);
    // verificar autenticacion
    if (!valido)
        return client.disconnect();

    // cliente autenticado
    // console.log('Cliente conectado', uid );
    usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        // console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
