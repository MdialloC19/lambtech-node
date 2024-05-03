
"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Accounts", {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            username: {
                type: Sequelize.STRING,
                required: true,
                trim: true,
                validate: {
                    isAlphanumeric: true,
                    len: [3, 24],
                }
            },
            phone: {
                type: Sequelize.STRING,
                required: true,
                trim: true,
                validate: {
                    isNumeric: true,
                    len: [9, 15],
                }
            },
            countryCode: {
                type: Sequelize.STRING,
                required: true,
                trim: true,
                validate: {
                    isNumeric: true,
                    len: [2, 3],
                }
            },
            role: {
                type: Sequelize.ENUM("user", "costumer", "deliverer", "partner", "admin"),
                defaultValue: "user",
            },
            password: {
                type: Sequelize.STRING,
                required: true,
                validate: {
                    len: [8, 24],
                }
            },
            email: {
                type: Sequelize.STRING,
                trim: true,
                validate: {
                    isEmail: true,
                },
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
        await queryInterface.dropTable("Accounts");
    },
};