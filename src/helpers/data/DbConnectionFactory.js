const _ = require('lodash');
const getDataConfig = require('./data-config');
const Connection = require('./Connection');

class DbConnectionFactory {
    static connections = {};

    static async createConnection(connectionName, key) {
        const newConnection = new Connection(connectionName);
        console.log(`[System] New DB connection made to {key: ${key}, name: ${connectionName.name}}`);
        return newConnection;
    }

    static async closeAllConnection () { // TO DEBUG
        const keys = Object.keys(this.connections);
        const p = keys.map( async k => await this.connections[k].closeConnection());
        this.connections = {};
        await Promise.all(p);
    }

    static async startAllConnections() {
        const connectionsConfig = getDataConfig();
        const keys = Object.keys(connectionsConfig);
        const p = keys.map(async k => {
            let _k = k.toLocaleLowerCase();
            return {[_k]: await this.createConnection(connectionsConfig[_k], _k)};
        });

        let connections = await Promise.all(p);
        let _temp = {};

        for(let i = 0; i < connections.length; i++) {
            _temp[Object.keys(connections[i])[0]] = connections[i][Object.keys(connections[i])[0]];
        }
        this.connections = _temp;
    }

    static async getConnection(connectionName) {
        if (_.isNil(this.connections[connectionName])) {
            this.connections[connectionName] = await this.createConnection(connectionName);
        }

        return  this.connections[connectionName];
    }

}

module.exports = DbConnectionFactory;
