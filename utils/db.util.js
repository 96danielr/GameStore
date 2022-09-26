const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Establish db connection
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'Dani9691*',
    port: '5432',
    database: 'GameStore',
    logging: false,
});
module.exports = { db, DataTypes };
