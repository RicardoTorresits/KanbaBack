const mssql = require('mssql');
const QueryOperation = require('./QueryOperations');

class Connection extends QueryOperation{
    connectionName = '';
    poolConnection = null;
    connectionConfig = null;

    constructor(connectionConfig) {
        let pc = new mssql.ConnectionPool(connectionConfig.config);
        super(pc);
        this.connectionConfig = connectionConfig.config;
        this.connectionName = connectionConfig.name;
        this.poolConnection = pc;
    }

    closeConnection() {
        this.connectionObj.close();
    }

}

module.exports = Connection;
