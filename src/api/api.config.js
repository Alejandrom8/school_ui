const config = {
    port: 8080,
    hostname: 'localhost'
}
config.url = `http://${config.hostname}:${config.port}`;

module.exports = config;