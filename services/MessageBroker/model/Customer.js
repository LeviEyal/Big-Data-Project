const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

const Customer = sequelize.define("customers", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lang: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    prevCalls: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    await Customer.sync();
})();


module.exports = Customer;