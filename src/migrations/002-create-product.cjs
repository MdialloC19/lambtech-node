"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Products", {
            productId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            order: {
                type: Sequelize.STRING,
                foreignKey: true,
                references: {
                    model: "Orders",
                    key: "orderId",
                    as: "order",
                },
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            list: {
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
        await queryInterface.dropTable("Products");
    },
};