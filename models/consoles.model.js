const { db, DataTypes } = require('../utils/db.util');

const Consoles = db.define('consoles', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	company: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Consoles };