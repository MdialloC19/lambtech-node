"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Costumers", {
            costumerId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            account: {
                type: Sequelize.STRING,
                notNull: true,
                foreignKey: true,
                references: {
                    model: "Accounts",
                    key: "userId",
                    as: "account",
                }
            },
            socketId: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Costumers");
    },
};
