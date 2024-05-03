"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Partners", {
            partnerId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            account: {
                type: Sequelize.STRING,
                foreignKey: true,
                references: {
                    model: "Accounts",
                    key: "userId",
                    as: "account",
                },
            },
            socketId: {
                type: Sequelize.STRING,
            },
            companyName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            companyAddress: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            companyPhone: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable("Partners");
    },
};