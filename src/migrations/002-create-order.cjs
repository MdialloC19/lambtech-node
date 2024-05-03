"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Orders", {
            orderId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            costumer: {
                type: Sequelize.STRING,
                foreignKey: true,
                references: {
                    model: "Costumers",
                    key: "costumerId",
                    as: "costumer",
                },
                allowNull: false,
            },
            deliverer: {
                type: Sequelize.STRING,
                foreignKey: true,
                references: {
                    model: "Deliverers",
                    key: "delivererId",
                    as: "deliverer",
                },
                allowNull: true,
            },
            date: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.ENUM("pending", "accepted", "expired", "canceled", "delivered"),
                defaultValue: "pending",
                allowNull: false,
            },
            from: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            to: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable("Orders");
    },
};
