import { Sequelize } from "sequelize";

const sequelize = new Sequelize('market', 'root', 'admin2025', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize