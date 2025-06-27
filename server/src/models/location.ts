import { DataTypes } from "sequelize";
import db from '../db/connection';

const Location = db.define('Location', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	latitude: {
		type: DataTypes.DECIMAL(10, 8),
		allowNull: false
	},
	longitude: {
		type: DataTypes.DECIMAL(11, 8),
		allowNull: false
	}
}, {
	createdAt: false,
	updatedAt: false
});

export default Location;