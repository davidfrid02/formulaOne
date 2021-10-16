const server = require('./src/server');
const config = require('./src/config');

server.listen(config.port, ()=>{
	console.log(`Server running on port ${config.port}`);
})