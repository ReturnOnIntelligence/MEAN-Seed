import { argv } from 'yargs';

class ServerConfig {
    MONGO_CONNECTION = argv['mongo_connection'] || process.env.MONGO_CONNECTION || 'mongodb://localhost/mongotest';

    PORT = argv['port'] || process.env.PORT || 9001;

    BUILD_TYPE = (argv['build-type'] || argv['env'] || process.env.ENV || '').toLowerCase();
}

const config: ServerConfig = new ServerConfig();
export default config;