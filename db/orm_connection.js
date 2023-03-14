const { Sequelize }=require('sequelize');

const database = new Sequelize('sql_nodejsshop', 'root','12345/database', { host: 'localhost', dialect: 'mysql' });

module.exports = {
    database
};