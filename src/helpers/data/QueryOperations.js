class QueryOperation {
    poolConnection = null;

    constructor(poolConnection) {
        this.poolConnection = poolConnection;
    }

    // Data Operation

    async query (command, inputs = [], outputs = []) {
        return this._run('query', command, inputs, outputs);
    }

    async queryEntity (command, entity, outputs = []) {
        const inputs = _fetchParams(entity);
        return this._run('query', command, inputs, outputs);
    }

    async execute (command, inputs = [], outputs = []) {
        return this._run('execute', command, inputs, outputs);
    }

    async executeEntity (command, entity, outputs = []) {
        const inputs = _fetchParams(entity);
        return this._run('execute', command, inputs, outputs);
    }

    /// Utils
    
    async _run(name, command, inputs=[], outputs=[]) {
        try {
            await this.poolConnection.connect();
            const request = this.poolConnection.request();
            this._assignParams(request, inputs, outputs);
            return request[name](command);
        } catch (error) {
            throw new Error(error);
        }
    }

    _fetchParams (entity) {
        const params = [];
        for (const key in entity) {
            if (entity.hasOwnProperty(key)) {
                const value = entity[key];
                params.push({
                    name: key,
                    value
                });
            }
        }
        return params;
    };
    
    _assignParams (request, inputs, outputs) {
        [inputs, outputs].forEach((params, index) => {
            const operation = index === 0 ? 'input' : 'output';
            params.forEach(param => {
                if (param.type) {
                    request[operation](param.name, param.type, param.value);
                } else {
                    request[operation](param.name, param.value);
                }
            });
        });
    };
    
    generateTable (columns, entities) {
        const table = new mssql.Table();
    
        columns.forEach(column => {
            if (column && typeof column === 'object' && column.name && column.type) {
                if (column.hasOwnProperty('options')) {
                    table.columns.add(column.name, column.type, column.options);
                } else {
                    table.columns.add(column.name, column.type);
                }
            }
        });
    
        entities.forEach(entity => {
            table.rows.add(...columns.map(i => entity[i.name]));
        });
    
        return table;
    };

}

module.exports = QueryOperation;
