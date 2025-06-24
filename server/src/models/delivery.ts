import { DataTypes } from "sequelize";
import db from '../db/connection';

const Delivery = db.define('Delivery', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	}, 
	start: {
		type: DataTypes.DATE,
		allowNull: false
	}, 
	end: {
		type: DataTypes.DATE,
		allowNull: true
	}
}, {
	createdAt: false,
	updatedAt: false
});

export default Delivery;

