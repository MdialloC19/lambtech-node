"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Notifications", {
            notificationId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            user: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM("costumer", "deliverer", "partner"),
                defaultValue: "deliverer",
            },
            message: {
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.ENUM("order", "message"),
            },
            action: {
                type: Sequelize.ENUM("accept", "reject"),
            },
            status: {
                type: Sequelize.ENUM("unread", "read"),
                defaultValue: "unread",
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
        await queryInterface.dropTable("Notifications");
    },
};