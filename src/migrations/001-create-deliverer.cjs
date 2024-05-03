"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Deliverers", {
            delivererId: {
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
            vehicle: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            vehiclePlate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cni: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            driverLicense: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
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
        await queryInterface.dropTable("Deliverers");
    },
};
