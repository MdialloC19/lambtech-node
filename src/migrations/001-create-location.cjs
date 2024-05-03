"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Locations", {

            user: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM("costumer", "deliverer", "partner"),
                defaultValue: "deliverer",
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.ENUM("home", "work", "other", "favorite", "current"),
                defaultValue: "other",
            },
            latitude: {
                type: Sequelize.DOUBLE,
            },
            longitude: {
                type: Sequelize.DOUBLE,
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
        //add constraint user and role as unique
        await queryInterface.addConstraint("Locations", {
            fields: ["user", "role"],
            type: "unique",
            name: "unique_user_role",
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Locations");
    },
};