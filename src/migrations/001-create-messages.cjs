"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Messages", {
            messageId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            sender: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            senderRole: {
                type: Sequelize.ENUM("costumer", "deliverer", "partner"),
                defaultValue: "costumer",
            },
            receiver: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            receiverRole: {
                type: Sequelize.ENUM("costumer", "deliverer", "partner"),
                defaultValue: "deliverer",
            },
            message: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM("sent", "delivered", "read"),
                defaultValue: "sent",
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
        await queryInterface.dropTable("Messages");
    },
};
