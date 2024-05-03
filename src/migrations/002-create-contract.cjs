"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Contracts", {
            contractId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            partner: {
                type: Sequelize.STRING,
                foreignKey: true,
                references: {
                    model: "Partners",
                    key: "partnerId",
                    as: "partner",
                },
            },
            deliverer: {
                type: Sequelize.STRING,
                foreignKey: true,
                references: {
                    model: "Deliverers",
                    key: "delivererId",
                    as: "deliverer",
                },
            },
            startDate: {
                type: Sequelize.DATE,
            },
            endDate: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.ENUM("pending", "active", "expired", "rejected", "canceled", "interrupted"),
                defaultValue: "pending",
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
        await queryInterface.dropTable("Contracts");
    },
};
