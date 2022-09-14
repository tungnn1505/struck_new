const Result = require('./constants/result');
const Sequelize = require('sequelize');
const Constant = require('./constants/constant');

async function connectDatabase(dbName, user, pass, ip) {
    const db = new Sequelize(dbName, user, pass, {
        host: ip,
        dialect: 'mssql',
        operatorsAliases: '0',
        // Bắt buộc phải có
        dialectOptions: {
            options: { encrypt: false }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });

    db.authenticate()
        .then(() => console.log('Ket noi thanh cong'))
        .catch(err => console.log(err.message));
    return db;
}

module.exports = {
    // config: {
    //     user: 'sa',
    //     password: '1234',
    //     server: 'localhost',
    //     database: 'AGELESS_QLNB',
    //     options: {
    //         encrypt: false,
    //     },
    // },
    config: {
        user: 'tungnn',
        password: 'tung@1998',
        server: '103.137.184.193',
        database: 'STRUCK_DB_ROOT', // GELESS_QLNB con demo
        options: {
            encrypt: false,
        },
    },
    configDBCustomer: {
        user: 'tungnn',
        password: 'tung@1998',
        server: '103.137.184.193',
        database: 'STRUCK_CUSTOMER_DB',
        options: {
            encrypt: false,
        },
    },
    connectDBCustomer: async function() {
        const db = new Sequelize(this.configDBCustomer.database, this.configDBCustomer.user, this.configDBCustomer.password, {
            host: this.configDBCustomer.server,
            dialect: 'mssql',
            operatorsAliases: '0',
            // Bắt buộc phải có
            dialectOptions: {
                options: { encrypt: false }
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });

        db.authenticate()
            .then(() => console.log('Ket noi thanh cong'))
            .catch(err => console.log(err.message));
        return db;
    },
    connectDatabase: async function() {
        const db = new Sequelize(this.config.database, this.config.user, this.config.password, {
            host: this.config.server,
            dialect: 'mssql',
            operatorsAliases: '0',
            // Bắt buộc phải có
            dialectOptions: {
                options: { encrypt: false }
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });

        db.authenticate()
            .then(() => console.log('Ket noi thanh cong'))
            .catch(err => console.log(err.message));
        return db;
    },
    connectDatabaseWithNameDB: async function(dbName) {
        const db = new Sequelize(dbName, this.config.user, this.config.password, {
            host: this.config.server,
            dialect: 'mssql',
            operatorsAliases: '0',
            // Bắt buộc phải có
            dialectOptions: {
                options: { encrypt: false }
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });

        db.authenticate()
            .then(() => console.log('Ket noi thanh cong'))
            .catch(err => console.log(err.message));
        return db;
    },
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    checkServerInvalid: async function(userID) {
        let customer;
        try {
            await connectDatabase(this.config.database, this.config.user, this.config.password, this.config.server).then(async dbCustomer => {
                let user = await mUser(dbCustomer).findOne({
                    where: {
                        ID: userID
                    }
                })
                customer = await mCustomer(dbCustomer).findOne({
                    where: {
                        ID: user.IDCustomer
                    }
                })
                await dbCustomer.close()
            })
            if (customer) {
                let db = await connectDatabase(customer.DatabaseName, customer.UsernameDB, customer.PassworDB, customer.ServerIP);
                return db;
            } else return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    updateTable: async function(listObj, table, id) {
        let updateObj = {};
        for (let field of listObj) {
            updateObj[field.key] = field.value
        }
        try {
            await table.update(updateObj, { where: { ID: id } });
            return Promise.resolve(1);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

}