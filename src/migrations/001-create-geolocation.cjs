"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Geolocations", {
            geolocationId: {
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
            socketId: {
                type: Sequelize.STRING,
            },
            latitude: {
                type: Sequelize.STRING,
            },
            longitude: {
                type: Sequelize.STRING,
            },
        });
        //add constraint user and role as unique
        await queryInterface.addConstraint("Geolocations", {
            fields: ["user", "role"],
            type: "unique",
            name: "unique_user_role",
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Geolocations");
    },
};
